const User = require('../models/user');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail.js');
// const sendEmail = require('../../server/utils/sendEmail');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    
    const { name, email, password, role, username } = req.body;
    
    
    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
        return next(new Errorhandler("User with this Email Already Exist", 401))
    }
    
    const user = await User.create({
        name,
        email,
        password,
        role: "user",
        username
    })
    sendToken(user, 200, res);
    
})

exports.loginUser = catchAsyncError(async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please Enter Email and Passord"
        })
    }

    const user = await User.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "email and password not correct"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: "email or password not correct"
        })
    }

    sendToken(user, 200, res)
})

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return next(new Errorhandler(`User with email ${email} does not exist`))
    }

    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`
    const text = `Your password Reset link is as follows: \n\n ${resetUrl}\n\n If You have not requested this you can ignore that`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'password Recovery',
            text: text
        })
        
        res.status(200).json({
            success: true,
            message: `Email Sent Successfully to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
        
        await user.save({validateBeforeSave: false})

        return next(new Errorhandler(error.message, 500))
    }
})

exports.resetPassword = catchAsyncError(async(req, res, next) => {
    const { verifyToken } = req.params;
    console.log(verifyToken)

    var message = CryptoJS.enc.Hex.parse(verifyToken);
    const resetPasswordToken = CryptoJS.SHA256(message).toString();


    const findToken = await User.findOne({ resetPasswordToken, resetPasswordExpired: { $gt: Date.now } })
    
    if (!findToken) {
        return next(new Errorhandler("Token might be Expired or not Valid", 401))
    }

    res.status(200).json({
        success: true,
        message: "password Change"
    })
} )