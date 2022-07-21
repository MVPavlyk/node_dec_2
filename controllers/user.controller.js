const {fileService} = require('../services');

module.exports = {
    getUsers: async (req, res) => {
        const users = await fileService.reader();

        res.json(users).status(200);
    },

    createUser: async (req, res) => {
        const {name, age} = req.body;

        if (!Number.isInteger(age) || age < 18) {
            res.status(400).json('Age is not valid');
        }

        if (!name || name.length < 3) {
            res.status(400).json('Name is not valid');
        }

        const users = await fileService.reader();

        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};

        await fileService.writer([...users, newUser]);

        res.json(newUser).status(201);
    },

    getUserById: async (req, res) => {
        const userId = req.params.userId;

        const users = await fileService.reader();

        const oneUser = users.find(user => user.id === +userId);

        if (!oneUser) {
            res.status(400).json(`User with id ${userId} not found`);
        }

        res.json(oneUser).status(200);
    },

    updateUserById: async (req, res) => {
        const {name, age} = req.body;

        const userId = req.params.userId;

        if (age && (!Number.isInteger(age) || age < 18)) {
            res.status(400).json('Set valid age');
        }

        if (name && name.length < 3) {
            res.status(400).json('Set valid name');
        }

        const users = await fileService.reader();

        const index = users.findIndex(user => user.id === +userId);

        if (index === -1) {
            res.status(400).json(`User with id ${userId} not found`);
        }

        const updatedUser = Object.assign(users[index], req.body);

        users.splice(index, 1);

        await fileService.writer([...users, updatedUser]);

        res.status(201).json(updatedUser);
    },

    deleteUser: async (req, res) => {
        const userId = req.params.userId;

        const users = await fileService.reader();

        const index = users.findIndex(user => user.id === +userId);

        if (index === -1) {
            res.status(400).json(`User with id ${userId} not found`);
        }

        users.splice(index, 1);

        await fileService.writer(users);

        res.status(204).json(`User with id ${userId} was deleted`);
    }

};
