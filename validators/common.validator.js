const Joi = require('joi');
const {constants} = require('../config');

module.exports = {
    nameValidator: Joi.string().alphanum().min(3).max(20),
    ageValidator: Joi.number().min(18).max(100),
    emailValidator: Joi.string().regex(constants.EMAIL_REGEX).trim().lowercase(),
    passwordValidator: Joi.string().regex(constants.PASSWORD_REGEX).trim(),
    phoneNumberValidator: Joi.string().regex(constants.PHONE_REGEX).trim()
};