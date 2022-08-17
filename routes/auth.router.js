const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');


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

module.exports = router;