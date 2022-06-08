class Errorhandler extends Error {
    constructor(message, statusCode) {
        //pass the message to parent class
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = Errorhandler;