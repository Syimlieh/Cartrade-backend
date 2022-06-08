const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controller/authController')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:tokenId').post(forgotPassword);
    
module.exports = router;