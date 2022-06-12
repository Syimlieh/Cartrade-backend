const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/userController')

router.route('/').get(getAllUsers);

module.exports = router

