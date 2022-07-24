const {userController} = require('../controllers');
const {commonMiddleware, userMiddleware} = require('../middlewares');
const router = require('express').Router();

router.get('/',
    userController.getUsers
);
router.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserAlreadyCreated,
    userController.createUser
);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById
);
router.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userMiddleware.isUserValidForUpdate,
    userController.updateUserById
);
router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUser
);

module.exports = router;