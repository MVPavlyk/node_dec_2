const {customError} = require('../errors');
const {userService} = require('../services');

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
            const {name, email, age, password} = req.body;

            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new customError('Age is not valid', 400));
            }

            if (!name || name.length < 3) {
                return next(new customError('Name is not valid', 400));
            }

            if (!email || email.length < 3) {
                return next(new customError('Email is not valid', 400));
            }

            if (!password || password.length < 3) {
                return next(new customError('Password is not valid', 400));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age && !Number.isInteger(age) || age < 18) {
                return next(new customError('Age is not valid', 400));
            }

            if (name && name.length < 3) {
                return next(new customError('Name is not valid', 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserAlreadyCreated: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.getOneUser({email});

            if (user) {
                return next(new customError('User already created', 409));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};