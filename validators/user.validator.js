const Joi = require('joi');
const {
    nameValidator,
    ageValidator,
    emailValidator,
    passwordValidator,
    phoneNumberValidator
} = require('./common.validator');

module.exports = {
    createUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phoneNumber: phoneNumberValidator.required()
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
        phoneNumber: phoneNumberValidator
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