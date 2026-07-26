require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/database");


const app = express();


// ==========================
// Database Connection
// ==========================

connectDB();



// ==========================
// Middleware
// ==========================

app.use(
    cors()
);


app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended:true
    })
);



// ==========================
// Serve Frontend
// ==========================

app.use(
    express.static(
        path.join(__dirname,"../")
    )
);



// ==========================
// Routes
// ==========================

const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/orders");


app.use(
    "/api/payment",
    paymentRoutes
);


app.use(
    "/api/orders",
    orderRoutes
);




// ==========================
// API Test Route
// ==========================

app.get(
    "/api/status",
    (req,res)=>{


        res.json({

            success:true,

            message:"PayPal Store API Running",

            time:new Date()

        });


    }
);




// ==========================
// Root Route
// ==========================

app.get(
    "/",
    (req,res)=>{


        res.send(
            "Demo PayPal Backend Working"
        );


    }
);





// ==========================
// 404 Handler
// ==========================

app.use(
    (req,res)=>{


        res.status(404).json({

            message:"Route not found"

        });


    }
);




// ==========================
// Error Handler
// ==========================

app.use(
(err,req,res,next)=>{


    console.log(
        "SERVER ERROR:",
        err
    );


    res.status(500).json({

        success:false,

        message:"Internal Server Error"

    });


});




// ==========================
// Start Server
// ==========================

const PORT =
process.env.PORT || 5000;



app.listen(
PORT,
()=>{


console.log(
`Server running on port ${PORT}`
);


});