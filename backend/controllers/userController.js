const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')

//Register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name, email, password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: "this is a sample pic",
            url:"image"
        }
    });

    sendToken(user,201,res);
});

// Login a user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email, password } = req.body;

    if(!email || !password){
        return new ErrorHandler("Please enter email and password", 401);
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return new ErrorHandler("Invalid email or password", 401);
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return new ErrorHandler("Invalid email or password", 401);
    }

    sendToken(user,201,res);

})