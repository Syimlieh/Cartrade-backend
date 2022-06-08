const Errorhandler = require("../utils/errorHandler");
// middleware for handling error
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {

        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'production') {
        let error = {...err};

        error.message = err.message;

        if (err.name === "CastError") {
            const message = `Resource not found ${err.path} Not Found`;
            error = new Errorhandler(message, 404);
        }
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new Errorhandler(message, 400);
        }

        if (err.name === 'JsonWebTokenError') {
            const message = 'Json web token is invalid';
            error = new Errorhandler(message, 500)
        }
        
        if (err.name === 'TokenExpiredError') {
            const message = 'Json web token is expired';
            error = new Errorhandler(message, 500)
        }

        if (err.name === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new Errorhandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error.'
        })
    }
}