const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');

exports.refreshToken = async (req, res, next) => {

   const cookies = req.cookies;
   if(!cookies?.refreshToken) {
       return next(new ErrorHandler("Refresh Token not Found Mess for dev", 401))
   }
    const refreshToken = cookies.refreshToken;
    
    

    

    const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, payload) => {
        console.log(payload.id);
        
        console.log(payload)
        const foundUser = await User.findOne({ _id: payload.id }).exec();
        if(!foundUser) {
            return next(new ErrorHandler("User Not Found", 400))
        }
        console.log(foundUser.id);
        const token = foundUser.getAcessToken();

        return res.status(200).json({
            success: true,
            token
        })
    });
}