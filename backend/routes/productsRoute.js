const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')
const router = express.Router();

router.route('/products').get(isAuthenticatedUser, getAllProducts);
router.route('/products/create').post(isAuthenticatedUser, authorizeRole('user'), createProduct);
router.route('/products/:id').put(isAuthenticatedUser, authorizeRole('user'), updateProduct).delete(isAuthenticatedUser, authorizeRole('user'), deleteProduct).get(getProductDetails);

module.exports = router;