const {getAllCarMake} = require('../controller/vehicleController');
const express = require("express")
const router = express.Router();

router.route('/getMake').get(getAllCarMake);
module.exports = router;


