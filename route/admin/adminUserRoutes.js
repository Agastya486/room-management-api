const express = require('express');
const router = express.Router();

const getAllUsers = require('../../controller/admin/adminUserController');

router.get('/admin/users', getAllUsers);

module.exports = router;