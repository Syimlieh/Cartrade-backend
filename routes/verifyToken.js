const express = require("express");
const { refreshToken } = require("../controller/refreshToken");
const router = express.Router();
var cors = require('cors')


router.route("/").get(refreshToken);

module.exports = router; 