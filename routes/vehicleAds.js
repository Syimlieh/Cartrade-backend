const express = require("express");
const router = express.Router()

const { addAds, updateAds, deleteAds } = require("../controller/vehicleAdsController")

router.route('/add').post(addAds)
router.route('/update').patch(updateAds)
router.route('/delete/:id').delete(deleteAds)

module.exports = router