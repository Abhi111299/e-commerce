const Product = require('../models/productsModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
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