const express = require("express");

const router = express.Router();

const paypalClient = require("../config/paypal");

const paypal = require("@paypal/checkout-server-sdk");

const Order = require("../models/Order");



// CREATE ORDER

router.post("/create-order", async(req,res)=>{


try{


const request =
new paypal.orders.OrdersCreateRequest();



request.requestBody({

intent:"CAPTURE",


purchase_units:[

{

amount:{

currency_code:"USD",

value:req.body.amount

}

}

]


});



const order =
await paypalClient.execute(request);



res.json({

id:order.result.id

});



}

catch(error){


console.log(error);


res.status(500).json({

message:"Unable to create order"

});


}



});







// CAPTURE ORDER


router.post("/capture-order/:orderID", async(req,res)=>{


try{


const request =
new paypal.orders.OrdersCaptureRequest(
req.params.orderID
);



request.requestBody({});



const capture =
await paypalClient.execute(request);



const payment =
capture.result;



const newOrder =
new Order({

paypalOrderId:
payment.id,


transactionId:
payment.purchase_units[0]
.payments.captures[0].id,


amount:
payment.purchase_units[0]
.amount.value,


status:
payment.status


});



await newOrder.save();




res.json({

message:"Payment completed",

order:newOrder

});



}


catch(error){


console.log(error);



res.status(500).json({

message:"Capture failed"

});


}



});



module.exports = router;