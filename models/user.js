const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validate = require("validator");
const { nanoid } = require('nanoid')
const CryptoJS = require("crypto-js");

require('dotenv').config('./.env');
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter name"]
    }, 
    username: {
        type: String,
        required: [true, "Please Enter Username"]
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: "Please Enter Correct Role"
        },
        default: "user"
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Email is invalid')
        //     }
        // },
        validate: [validate.isEmail, "Please Enter valid Email Address"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [8, "Please Enter at Least 8 Character"],
        select: false,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
},
{
    timestamp: true
})

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.getAcessToken = function() {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({id: this._id}, jwtSecretKey, {expiresIn: process.env.JWT_EXPIRES_TIME});
}

userSchema.methods.getRefreshToken = function() {
    let refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    return jwt.sign({id: this._id}, refreshSecret, {expiresIn: process.env.JWT_EXPIRES_TIME});
}

userSchema.methods.generateResetToken = function () {
    const resetToken = nanoid(30);

    var message = CryptoJS.enc.Hex.parse(resetToken);
    this.resetPasswordToken = CryptoJS.SHA256(message).toString();

    this.resetPasswordExpired = Date.now(10 * 60 * 1000)

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);
