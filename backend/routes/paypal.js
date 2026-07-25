const express = require("express");
const router = express.Router();

const paypalClient = require("../config/paypal");

const paypal = require("@paypal/checkout-server-sdk");


// CREATE PAYPAL ORDER

router.post("/create-order", async(req,res)=>{


try{


const request = new paypal.orders.OrdersCreateRequest();


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



const order = await paypalClient.execute(request);



res.json({

id:order.result.id

});



}

catch(error){


console.log(error);


res.status(500).json({

message:"Unable to create PayPal order"

});


}



});





// CAPTURE PAYMENT

router.post("/capture-order/:orderID", async(req,res)=>{


try{


const request =
new paypal.orders.OrdersCaptureRequest(
req.params.orderID
);



request.requestBody({});



const capture =
await paypalClient.execute(request);



res.json(capture.result);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Payment capture failed"

});


}


});




module.exports = router;