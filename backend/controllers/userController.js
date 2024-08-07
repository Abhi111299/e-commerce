const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const { comparePassword, getResetTokenPasswordToken } = require('../utils/helper');
const sendEmail = require('../utils/sendEmail');

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample pic",
            url: "image"
        }
    });

    sendToken(user, 201, res);
});

// Login a user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 401));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user,201,res);
});

// Logout a user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(201).json({ success: true, message: "User logged out successfully" });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next)=>{
    const user = await user.findOne({emai: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found!", 404));
    }
    const resetToken = user.getResetTokenPasswordToken(user);
    await user.save({ validationBeforeSave: false});
    const resetPasswordurl = `${req.protocol}://$${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is \n\n ${resetPasswordurl} \n\n If you have not requested this email
    then please ignore it`;

    try{
        await sendEmail({
            email: user.email,
            subject: `E-commerce Password Recovery`,
            message
        });

        res.status(200).json({
            success:true, message: `Email sent to ${user.email} successfully.`
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validationBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
})