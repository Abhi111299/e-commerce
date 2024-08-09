const Product = require('../models/productsModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Order = require('../models/orderModel');

exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
    
      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });
    
      res.status(201).json({
        success: true,
        order,
      });
})

exports.getSingleOrderDetails = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        message: "Order found successfully",
        order
    })
})

exports.getLoggedInUserOrderDetails = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.find({user: req.user._id});

    if(!order){
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        message: "Order found successfully",
        order
    })
})

exports.getAllOrders = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.find();

    if(!order){
        return next(new ErrorHandler("Order not found", 404));
    }

    let totalAmount = 0;
    order.forEach((order)=>{
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        message: "Order found successfully",
        order,
        totalAmount
    })
})

