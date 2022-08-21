module.exports = {
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    EMAIL_REGEX: /^\S+@\S+\.\S+$/,
    PHONE_REGEX: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    ACCESS_SECRET_WORD: 'Mykola',
    REFRESH_SECRET_WORD: 'Pavlyk',
    FORGOT_PASSWORD_SECRET_WORD: 'kuki-makuki'
};