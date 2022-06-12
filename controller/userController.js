const User = require('../models/user');
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require('../utils/errorHandler');

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    
    const checkUser = await User.find();
    
    res.status(200).json({
        status: true,
        message: "Fetch Successfullly",
        data: checkUser
    })
    
})


