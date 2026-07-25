const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

    paypalOrderId:{
        type:String,
        required:true
    },


    transactionId:{
        type:String
    },


    customerEmail:{
        type:String
    },


    products:[
        {
            name:String,
            price:Number,
            quantity:Number
        }
    ],


    amount:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        default:"Pending"
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});



module.exports = mongoose.model(
    "Order",
    orderSchema
);