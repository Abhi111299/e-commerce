const express = require('express');
const { registerUser, loginUser, logout, getUserData, forgotPassword, resetPassword, updatePassword, updateProfile, getAllUsers, getSingleUserById, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/role/update").put(isAuthenticatedUser, authorizeRole('user'), updateUserRole);
router.route("/admin/delete/user/:id").delete(isAuthenticatedUser, authorizeRole('user'), deleteUser);
router.route("/logout").get(logout);
router.route("/admin/all_users").get(isAuthenticatedUser, authorizeRole('user'), getAllUsers);
router.route("/admin/single_user/:id").get(isAuthenticatedUser, authorizeRole('user'), getSingleUserById);
router.route("/me").get(isAuthenticatedUser, getUserData );

module.exports = router;