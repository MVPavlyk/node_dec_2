const jwt = require('jsonwebtoken');

const {constants} = require('../config');
const {customError} = require('../errors');

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, constants.ACCESS_SECRET_WORD, {expiresIn: '2m'});
        const refresh_token = jwt.sign(payload, constants.REFRESH_SECRET_WORD, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    generateActionToken: (actionType, payload = {}) => {
        let secretWord = '';
        let expiresIn = '7d';

        if (actionType === 'FORGOT_PASSWORD') {
            secretWord = constants.FORGOT_PASSWORD_SECRET_WORD;
        } else {
            throw new customError('Wrong action type', 400);
        }

        return jwt.sign(payload, secretWord, {expiresIn});
    },

    verifyAccessToken: (token = '') => {
        try {
            return jwt.verify(token, constants.ACCESS_SECRET_WORD);
        } catch (e) {
            throw new customError('Token not valid))', 401);
        }

    },

    verifyRefreshToken: (token = '') => {
        try {
            return jwt.verify(token, constants.REFRESH_SECRET_WORD);
        } catch (e) {
            throw new customError('Token not valid))', 401);
        }
    },

    verifyActionToken: (token = '', tokenType) => {
        try {
            let secretWord = ''

            if (tokenType === 'FORGOT_PASSWORD') {
                secretWord = constants.FORGOT_PASSWORD_SECRET_WORD;
            }

            return jwt.verify(token, secretWord);
        } catch (e) {
            throw new customError('Token not valid))', 401);
        }
    }
};


