var nodemailer = require("nodemailer");
const { google } = require('googleapis');

const OAuth2Client = new google.auth.OAuth2(process.env.mailClientId, process.env.mailClientSecret, process.env.mailRedirectURI)
OAuth2Client.setCredentials({ refresh_token: process.env.mailRefreshToken })


const sendEmail = async (option) => {
    const accessToken = await OAuth2Client.getAccessToken()
    let transporter = nodemailer.createTransport({
        host: process.env.mailHost,
        port: 587,
        secure: false, 
        service: process.env.mailsService,
        auth: {
            type: "OAUTH2",
            user: process.env.mailUsername, // generated ethereal user 
            clientId: process.env.mailClientId,
            clientSecret: process.env.mailClientSecret,
            refreshToken: process.env.mailRefreshToken,
            accessToken: accessToken,
        },
    });
    
    await transporter.sendMail({
        from: `${process.env.mailName}, <${process.env.mailUsername}>`, // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        text: option.text, // plain text body
    });
    
}

module.exports = sendEmail