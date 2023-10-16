const express=require('express');
const userController = require('../controllers/userController');

const router=express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.put('/change-password', userController.changePassword);
router.get('/users', userController.getUsers);

module.exports = router;