const {customError} = require('../errors');
const {tokenService, passwordService} = require('../services');
const {OAuth, ActionTokens} = require('../dataBase');
const {userPresenter} = require('../presenters/user.presenter');
const {userValidator} = require('../validators');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                return next(new customError('No token', 401));
            }

            const isTokenValid = tokenService.verifyAccessToken(token);

            if (!isTokenValid) {
                return next(new customError('Authorization error', 401));
            }

            const tokenInfo = await OAuth.findOne({access_token: token}).populate('userId');


            if (!tokenInfo) {
                return next(new customError('Token error', 401));
            }

            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                return next(new customError('No token', 401));
            }

            const isTokenValid = tokenService.verifyRefreshToken(token);

            if (!isTokenValid) {
                return next(new customError('Authorization error', 401));
            }

            const tokenInfo = await OAuth.findOne({refresh_token: token});

            if (!tokenInfo) {
                return next(new customError('Token error', 401));
            }

            req.user = userPresenter(tokenInfo.userId);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                return next(new customError('No token', 401));
            }

            const isTokenValid = tokenService.verifyActionToken(token, actionType);

            if (!isTokenValid) {
                return next(new customError('Authorization error', 401));
            }

            const tokenInfo = await ActionTokens.findOne({token});

            if (!tokenInfo) {
                return next(new customError('Token error', 401));
            }

            req.user = userPresenter(tokenInfo.userId);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkNewPassword: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newPasswordValidator.validate(req.body);

            if (error) {
                return next(new customError(error.details[0].message, 400));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }

    },

    checkOldPassword: async (req, res, next) => {
        try {
            const userPassword = req.user.password;

            const {oldPassword} = req.body;

            const checkPassword = await passwordService.comparePassword(userPassword, oldPassword);

            if (!checkPassword) {
                return next(new customError('Incorrect old password', 404));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};