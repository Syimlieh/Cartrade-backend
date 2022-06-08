const Vehicle = require('../models/carinfo');

exports.getAllCarMake = async (req, res) => {
    const vehicle = await Vehicle.find({}, {make: true})
    if (!vehicle) {
        return res.status(404).json({
            success: false,
            message: "Car Make Not Exist"
        })
    }
    res.status(200).json({
        success: true,
        data: vehicle
    })
}