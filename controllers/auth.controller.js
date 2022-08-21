const {tokenService, passwordService, emailService} = require('../services');
const {customError} = require('../errors');
const {userPresenter} = require('../presenters/user.presenter');
const {OAuth, ActionTokens, User} = require('../dataBase');
const {emailActions} = require('../config');
const {FORGOT_PASSWORD} = require('../config/email-actions.enum');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;

            const {password} = req.body;

            const checkPassword = await passwordService.comparePassword(hashPassword, password);

            if (!checkPassword) {
                return next(new customError('Uncorect email or password', 404));
            }

            const tokens = tokenService.generateTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({
                user: userPresenter(req.user),
                tokens
            }).status(200);

        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res) => {

        const {_id} = req.user;

        const refresh_token = req.get('Authorization');

        await OAuth.deleteOne({refresh_token});

        const tokens = tokenService.generateTokens();

        await OAuth.create({
            userId: _id,
            ...tokens
        });

        res.json({
            ...tokens
        }).status(200);
    },

    logout: async (req, res) => {
        const access_token = req.get('Authorization');

        const {user} = req;

        await emailService.sendMail(user.email, emailActions.LOGOUT, {name: user.name, count: 2});

        await OAuth.deleteOne({access_token});

        res.json(req.user._id).status(201);
    },

    forgotPassword: async (req, res) => {
        const {name, _id, email} = req.user;

        const forgotToken = tokenService.generateActionToken(FORGOT_PASSWORD, {name, _id});

        await ActionTokens.create({
            userId: _id,
            actionToken: forgotToken,
            actionType: FORGOT_PASSWORD
        });

        await emailService.sendMail(email, emailActions.FORGOT_PASSWORD, {name, forgotToken});

        res.json(req.user._id).status(200);
    },

    setForgotPassword: async (req, res) => {
        const {_id} = req.user;

        const hashedPassword = await passwordService.hashPassword(req.body.newPassword);

        await ActionTokens.deleteOne({userId: _id, actionType: FORGOT_PASSWORD});

        await User.findOneAndUpdate(_id, {password: hashedPassword});

        res.json(req.user._id).status(200);
    },

    setNewPassword: async (req, res) => {
        const {_id} = req.user

        const newHashedPassword = await passwordService.hashPassword(req.body.newPassword);

        await User.findOneAndUpdate(_id, {password: newHashedPassword});

        res.json(req.user._id).status(200);
    }
};