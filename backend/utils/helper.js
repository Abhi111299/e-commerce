// helper.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    return await bcrypt.hash(password, salt);
};

exports.comparePassword = async function (inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
};

exports.getJWTToken = function (userId) {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};

exports.getResetPasswordToken = function(user){ 
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).toString("hex");
    user.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}
