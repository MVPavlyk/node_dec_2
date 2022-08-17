const {customError} = require('../errors');
const {userService} = require('../services');
const {userValidator, queryValidator} = require('../validators');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.getOneUser({_id: id});

            if (!user) {
                return next(new customError('User not found', 400));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: async (req, res, next) => {
        try {
            console.log('1m');

            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                return next(new customError(error.details[0].message, 400));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new customError(error.details[0].message, 400));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserAlreadyCreated: async (req, res, next) => {
        try {
            console.log('2m');

            const {email} = req.body;

            const user = await userService.getOneUser({email});

            if (user) {
                return next(new customError('User already created', 409));
            }

            console.log('2m1');

            next();
        } catch (e) {
            next(e);
        }
    },

    isQueryValid: async (req, res, next) => {
        try {
            const {error, value} = queryValidator.validate(req.query);

            if (error) {
                return next(new customError(error.details[0].message, 400));
            }

            req.query = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForLogin: async (req, res, next) => {
        try {
            const {error, value} = userValidator.loginUserValidator.validate(req.body);

            if (error) {
                return next(new customError(error.details[0].message, 400));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserRegistered: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.getOneUser({email});

            if (!user) {
                return next(new customError('User not found', 404));
            }

            req.user = user

            next();
        } catch (e) {
            next(e);
        }
    }
};