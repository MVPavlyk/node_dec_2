const {customError} = require('../errors');
const {tokenService} = require('../services');
const {OAuth} = require('../dataBase');
const {userPresenter} = require('../presenters/user.presenter');

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

            req.user = userPresenter(tokenInfo.userId);

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

            const tokenInfo = await OAuth.findOne({refresh_token: token})

            if (!tokenInfo) {
                return next(new customError('Token error', 401));
            }

            req.user = userPresenter(tokenInfo.userId);

            next();
        } catch (e) {
            next(e);
        }
    }
};