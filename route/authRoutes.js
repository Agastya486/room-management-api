const express = require('express');
const router = express.Router();

// import middleware
const { userValidateInputsRegister, adminValidateInputsRegister, validateInputsLogin } = require('../middleware/validateInputs');
const verifyToken = require('../middleware/verifyToken');

// import controller
const { registerUser, registerAdmin, loginController, refreshToken } = require('../controller/authController');

// user register
router.post('/users/register', userValidateInputsRegister, registerUser);
// admin register
router.post('/admins/register', verifyToken, adminValidateInputsRegister, registerAdmin);

router.post('/login', validateInputsLogin, loginController);
router.post('/refresh', refreshToken)

module.exports = router;