const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const { comparePassword, getResetPasswordToken } = require('../utils/helper');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return next(new ErrorHandler("User not found!", 404));
    }
    const resetToken = getResetPasswordToken(user);
    await user.save({ validationBeforeSave: false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is \n\n ${resetPasswordUrl} \n\n If you have not requested this email, then please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `E-commerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})

//Reset password
exports.resetPassword = (async(req, res, next)=>{
    const resetPasswordToken = crypto.createHash("sha256")
    .update(req.params.token)
    .toString("hex");

    const user = await User.findOne(
        {   
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},
        });
    
    if(!user){
        return next(new ErrorHandler("Reset Password token is expired or it has been invalid!", 404));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password & confirm password should be match", 404));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendToken(user, 200, res);
})

exports.getUserData = (catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById( req.user.id );
    res.status(200).json({success:true, data:{user}});
}))

exports.updatePassword = (catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById( req.user.id ).select("+password");
    const isPasswordMatched = await comparePassword(req.body.oldPassword, user.password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect", 401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Both password should be same.", 401));
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);

}))

exports.updateProfile = (catchAsyncErrors(async(req, res, next)=>{
    const newUserData = {name: req.body.name, email: req.body.email};
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({success: true, message: "User updated successfully"});
}))

exports.getAllUsers = (catchAsyncErrors(async(req, res, next)=>{
    const user = await User.find({});

    res.status(200).json({success: true, message: "Fetched All users successfully", user});
}))

exports.getSingleUserById = (catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id); 

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({success: true, message: "Fetched user successfully", user});
}))


exports.updateUserRole = (catchAsyncErrors(async(req, res, next)=>{
    const newUserData = {name: req.body.name, email: req.body.email, role: req.body.role};
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({success: true, message: "User role updated successfully"});
}))

exports.deleteUser = (catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id); 
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    await User.findByIdAndDelete(user);

    res.status(200).json({success: true, message: "User Deleted successfully"});
}))


