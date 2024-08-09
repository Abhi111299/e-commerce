const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');
const { newOrder, getSingleOrderDetails, getLoggedInUserOrderDetails, getAllOrders } = require('../controllers/orderController');

router.route('/new/order').post(isAuthenticatedUser, newOrder);
router.route('/get/single_order/:id').get(isAuthenticatedUser, authorizeRole('user'), getSingleOrderDetails);
router.route('/get_orders/me').get(isAuthenticatedUser, getLoggedInUserOrderDetails);
router.route('/get_all_orders').get(isAuthenticatedUser, authorizeRole('user'), getAllOrders);
module.exports = router;