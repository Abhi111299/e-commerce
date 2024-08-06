const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Please enter product description"]
    },
    price:{
        type: String,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price can not exceed 8 characters"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }   
        }   
    ],
    category:{
        type: String,
        required: [true, "Please enter category name"]
    },
    stock:{
        type: Number,
        required: [true, "please enter product Stock"],
        maxLength: [4, "Stock can not exceed 4 characters"]
    },
    numOfreviews:[
        {
            name:{
                type: String,
                required: true
            },
            ratings:{
                type:Number,
                required:true
            },
            comments:{
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);