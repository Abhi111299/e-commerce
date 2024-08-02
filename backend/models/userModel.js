const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({path: "backend/config/.env"});
const jwt = require('jsonwebtoken');

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

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);