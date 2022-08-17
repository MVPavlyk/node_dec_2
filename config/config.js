module.exports = {
    PORT: process.env.PORT || 50001,
    DATABASE: process.env.DATABASE || 'mongodb://127.0.0.1/dec',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'kaka@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '123qwe',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://locallhost:3000'
};