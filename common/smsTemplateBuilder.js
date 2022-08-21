const {smsActions} = require('../enums');

module.exports = {
    [smsActions.WELCOME]: (userName) => {
        return `Dear, ${userName}, welcome on our platform!`
    }
};