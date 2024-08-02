const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=> {
    const {token} = req.cookies;

    if(!token){
        return new ErrorHandler("Please login");
    }
    const decodeData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodeData.id);
    next();
});
