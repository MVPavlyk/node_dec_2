const Joi = require('joi');
const {nameValidator, ageValidator, emailValidator, passwordValidator} = require('./common.validator');

module.exports = {
    createUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator
    }),

    loginUserValidator: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    emailValidator: Joi.object({
        email: emailValidator.required(),
    }),

    newPasswordValidator: Joi.object({
        newPassword: passwordValidator.required(),
        oldPassword: passwordValidator
    })
};