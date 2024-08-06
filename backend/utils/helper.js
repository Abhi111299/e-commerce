// helper.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    return await bcrypt.hash(password, salt);
};

exports.comparePassword = async function (inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
};

exports.getJWTToken = function (userId) { console.log("actual Id", userId);
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};
