const twilio = require('twilio');

const config = require('../config/config');
const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);


module.exports = {
    sendSMS: async (userNumber, message) => {
        try {
            await client.messages
                .create({
                    body: message,
                    from: config.TWILIO_NUMBER,
                    to: userNumber
                });
        } catch (e) {
            console.error(e);
        }
    }
};