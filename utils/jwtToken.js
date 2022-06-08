// create and send token and save it in http only cookie
const {LocalStorage} = require('node-localstorage')
const sendToken = (user, statusCodes, res) => {
    const localStorage = new LocalStorage('./scratch')
    const token = user.getAcessToken();
    const refreshToken  = user.getRefreshToken();
    
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),

    }
    res
        .status(statusCodes)
        // .cookie('refreshToken', refreshToken, options)
        .cookie('refreshToken', refreshToken, { sameSite: 'strict', secure: false, maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            message: "cookie Being Initialize",
            refreshToken,
            token
        })
}

module.exports = sendToken;