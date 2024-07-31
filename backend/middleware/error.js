const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server error";

    if(err.name === "CastError"){
        const message = `Resource not found ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message,
    })
}