const {User} = require('../dataBase');

module.exports = {
    getAllUsers: async (params = {}) => {
        return User.find(params);
    },
    getOneUser: async (params = {}) => {
        return User.findOne(params);
    },
    createUser: async (params = {}) => {
        return User.create(params);
    },
    updateOneUser: async (params = {}, userData) => {
        return User.findOneAndUpdate(params, userData);
    },
    deleteOneUser: async (params = {}) => {
        return User.findOneAndDelete(params);
    }
};