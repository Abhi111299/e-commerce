const Product = require('../models/productsModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
        const product = await Product.create(req.body);
        res.status(201).json({success:true, product});
});

exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();
        const products = await apiFeatures.query;
        res.status(201).json({success:true, products});
});

exports.updateProduct = async(req,res, next)=>{
    try{
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json({success:true,  message: "Product  updated succesfully", products});
    }catch(error){
        console.log(error);
    }
}

exports.deleteProduct = async(req,res, next)=>{
    try{
        let productById = await Product.findById(req.params.id);
        if(!productById){
            return next(new ErrorHandler("Product not found",404));
        }
        const product = await Product.findByIdAndDelete(productById);
        res.status(201).json({success:true, message: "Product deleted successfully"});
    }catch(error){
        console.log(error);
    }
}

exports.getProductDetails = async(req,res, next)=>{
    try{
        let productById = await Product.findById(req.params.id);
        if(!productById){
            return next(new ErrorHandler("Product not found",404));
        }
        const product = await Product.findById(productById);
        res.status(201).json({success:true, message: "Product found successfully", data: product});
    }catch(error){
        console.log(error);
    }
}