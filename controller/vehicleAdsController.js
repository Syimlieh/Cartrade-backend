const VehicleAds = require("../models/vehicleAds");
const catchAsyncError = require("../middleware/catchAsyncError");

const addAds = catchAsyncError(async (req, res, next) => {
    const { title, description, image, price, address, make, year, fuel, kmsDriven, noOwner, status } = req.body;
console.log(VehicleAds)
    const ads = await VehicleAds.create({
        title,
        description,
        price,
        address,
        make,
        year,
        fuel,
        kmsDriven,
        noOwner,
        status: status || "Available for Sale"
    })
    res.status(200).json({
        success: true,
        message: "Added Successfully",
        data: ads
    })

}) 

const updateAds = catchAsyncError(async (req, res, next) => {
    const { id, title, description, image, price, address, make, year, fuel, kmsDriven, noOwner, status } = req.body;
    const updateData = {
        title,
        description,
        price,
        address,
        make,
        year,
        fuel,
        kmsDriven,
        noOwner,
        status
    }
    console.log(updateData)
    const updateAd = await VehicleAds.findByIdAndUpdate(id, updateData , { 
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        message: "Update ads Successfully",
        data: updateAd
    })
})



const deleteAds = catchAsyncError(async (req, res, next) => {
    const findAds = await VehicleAds.findOne({ _id: req.params.id });
    if (!findAds) {
        return next(new ErrorHandler("Ads not found", 404))
    }
    
    await findAds.remove();
    res.status(200).json({
        success: true,
        message: "deleted Ads Successfully",
        data: findAds
    })
})


module.exports = { addAds, updateAds, deleteAds };