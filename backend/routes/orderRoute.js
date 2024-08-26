const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');
const { updateOrder, newOrder, getSingleOrderDetails, getLoggedInUserOrderDetails, getAllOrders, deleteOrder } = require('../controllers/orderController');

router.route('/new/order').post(isAuthenticatedUser, newOrder);
router.route('/get/single_order/:id').get(isAuthenticatedUser, authorizeRole('user'), getSingleOrderDetails);
router.route('/get_orders/me').get(isAuthenticatedUser, getLoggedInUserOrderDetails);
router.route('/admin/get_all_orders').get(isAuthenticatedUser, authorizeRole('user'), getAllOrders);
router.route('/admin/update_order/:id').put(isAuthenticatedUser, authorizeRole('user'), updateOrder).delete(isAuthenticatedUser, authorizeRole('user'),deleteOrder);
module.exports = router;