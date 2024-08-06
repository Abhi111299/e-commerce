const mongoose = require('mongoose');
const validator = require('validator');
const { hashPassword } = require('../utils/helper')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        maxLength: [30, "Name can not exceed 30 characters"],
        minLength: [4, "Name should be more than 5 characters"]
    },
    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        maxLength:[20, "Password can not exceed more than 20 characters"],
        minLength: [8, "Password should be 8 characters"],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }   
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await hashPassword(this.password);
});

module.exports = mongoose.model("User", userSchema);