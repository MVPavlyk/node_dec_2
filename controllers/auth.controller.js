const {tokenService, passwordService, emailService} = require('../services');
const {customError} = require('../errors');
const {userPresenter} = require('../presenters/user.presenter');
const {OAuth} = require('../dataBase');
const {emailActions} = require('../config');

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
        const {user} = req;

        await emailService.sendMail(user.email, emailActions.FORGOT_PASSWORD, {name: user.name});

        res.json(req.user._id).status(201);
    }
};