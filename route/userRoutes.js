const express = require('express');
const router = express.Router();

// import middleware
const verifyToken = require('../middleware/verifyToken');
const isUser = require('../middleware/isUser');

// import controller
const { getUser, editUser, deleteUser } = require('../controller/userController');

router.get('/users', verifyToken, getUser); // GET user's data
router.patch('/users/:id', verifyToken, isUser(true), editUser); // update user
router.delete('/users/:id', verifyToken , isUser(true), deleteUser); // delete user

module.exports = router;