const express = require('express');
const { getAllProducts, createProductReview, getAllReviewsOfProduct, createProduct, updateProduct, deleteProduct, getProductDetails, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')
const router = express.Router();

router.route('/products').get(isAuthenticatedUser, getAllProducts);
router.route('/admin/products/create').post(isAuthenticatedUser, authorizeRole('user'), createProduct);
router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRole('user'), updateProduct);
router.route('/admin/deleteProducts/:id').delete(isAuthenticatedUser, authorizeRole('user'), deleteProduct);
router.route('/products/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/getAllReviews').get(getAllReviewsOfProduct);
router.route('/deleteReviews').delete(isAuthenticatedUser, authorizeRole('user'), deleteReview);

module.exports = router;