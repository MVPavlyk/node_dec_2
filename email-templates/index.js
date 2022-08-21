const emailActions = require('../enums/email-actions.enum');

module.exports = {
    [emailActions.WELCOME]: {
        subject: 'Welcome om board',
        template: 'welcome'
    },
    [emailActions.FORGOT_PASSWORD]: {
        subject: 'Its look like you forgot password',
        template: 'forgot-password'
    },
    [emailActions.USER_BANNED]: {
        subject: 'Ops, your account was blocked',
        template: 'banned'
    },
    [emailActions.LOGOUT]: {
        subject: 'Bye',
        template: 'logout'
    }
};