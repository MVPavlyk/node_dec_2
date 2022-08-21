const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {FORGOT_PASSWORD} = require('../enums/email-actions.enum');


router.post('/login',
    userMiddleware.isUserValidForLogin,
    userMiddleware.isUserRegistered,
    authController.login
);
router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);
router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);
router.post('/forgotPassword',
    userMiddleware.isEmailValid,
    userMiddleware.isUserExistByEmail,
    authController.forgotPassword
);
router.post('/setForgotPassword',
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authMiddleware.checkNewPassword,
    authController.setForgotPassword,
);
router.post('/changePassword',
    authMiddleware.checkAccessToken,
    authMiddleware.checkOldPassword,
    authMiddleware.checkNewPassword,
    authController.setNewPassword
);

module.exports = router;
