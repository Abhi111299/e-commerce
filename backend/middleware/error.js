const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server error";

    if(err.name === "CastError"){
        const message = `Resource not found ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Please try again.`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, Please login again`;
        err = new ErrorHandler(message, 400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message,
    })
}