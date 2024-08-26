const Product = require('../models/productsModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({success:true, product});
});

exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(201).json({success:true, productCount, products });
});

exports.updateProduct = catchAsyncErrors(async(req,res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.status(201).json({success:true,  message: "Product  updated successfully", products});
    
});

exports.deleteProduct = catchAsyncErrors(async(req,res, next)=>{
    let productById = await Product.findById(req.params.id);
    if(!productById){
        return next(new ErrorHandler("Product not found",404));
    }
    const product = await Product.findByIdAndDelete(productById);
    res.status(201).json({success:true, message: "Product deleted successfully"});
});

exports.getProductDetails = catchAsyncErrors(async(req,res, next)=>{
    let productById = await Product.findById(req.params.id);
    if(!productById){
        return next(new ErrorHandler("Product not found",404));
    }
    const product = await Product.findById(productById);
    res.status(201).json({success:true, message: "Product found successfully", data: product});
});

exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
})

exports.getAllReviewsOfProduct = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews:  product.reviews
    })
})

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });