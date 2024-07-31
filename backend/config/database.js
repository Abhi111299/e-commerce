const mongoose = require('mongoose');

const connectDB = ()=>{
        mongoose.connect(process.env.DB_URI).then((data)=>{
            console.log("MongoDB connected succesfully");
        });
   
}

module.exports = connectDB;