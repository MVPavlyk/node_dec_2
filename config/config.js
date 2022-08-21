module.exports = {
    PORT: process.env.PORT || 50001,
    DATABASE: process.env.DATABASE || 'mongodb://127.0.0.1/dec',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'kaka@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '123qwe',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://locallhost:3000',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '111',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '222',
    TWILIO_NUMBER: process.env.TWILIO_NUMBER || '+330222'
};