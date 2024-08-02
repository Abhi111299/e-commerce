const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth')
const router = express.Router();

router.route('/products').get(isAuthenticatedUser, getAllProducts);
router.route('/products/create').post(createProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct).get(getProductDetails);

module.exports = router;