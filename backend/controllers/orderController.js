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

exports.updateOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }
    
    if(order.orderStatus == "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 404));
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product, order.quantity);
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});
    res.status(200).json({success: true});
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});

}

exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await Order.findByIdAndDelete(order);
    res.status(200).json({success:true, message: "Order deleted successfully"});
})

