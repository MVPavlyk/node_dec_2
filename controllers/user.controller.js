const {userService, passwordService, emailService} = require('../services');
const {userPresenter} = require('../presenters/user.presenter');
const {emailActions} = require('../config');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);
            const usersForResponse = [];
            for (const user of users) {
                usersForResponse.push(userPresenter(user));
            }
            res.json(usersForResponse).status(200);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            console.log(1);
            const {name, email} = req.body;

            const hashedPassword = await passwordService.hashPassword(req.body.password);

            const newUser = await userService.createUser({...req.body, password: hashedPassword});

            await emailService.sendMail(email, emailActions.WELCOME, {name})

            res.json(userPresenter(newUser)).status(201);
        } catch (e) {
            next(e);
        }

    },

    getUserById: async (req, res, next) => {
        try {
            const oneUser = req.user;
            res.json(userPresenter(oneUser)).status(200);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const updatedUser = await userService.updateOneUser({_id: req.params.id}, req.body);
            res.json(userPresenter(updatedUser)).status(201);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await userService.deleteOneUser({_id: id});

            res.json(`User with id ${id} was deleted`).status(204);
        } catch (e) {
            next(e);
        }
    }

};
