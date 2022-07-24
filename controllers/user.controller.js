const {userService} = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users).status(200);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.json(newUser).status(201);
        } catch (e) {
            next(e);
        }

    },

    getUserById: async (req, res, next) => {
        try {
            const oneUser = req.user;
            res.json(oneUser).status(200);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const updatedUser = await userService.updateOneUser({_id: req.params.id}, req.body);
            res.json(updatedUser).status(204);
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
