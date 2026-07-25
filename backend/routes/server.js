// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


// Create Express App
const app = express();


// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));




// MongoDB Connection

mongoose
.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected Successfully");

})
.catch((error)=>{

    console.log("MongoDB Connection Error:");
    console.log(error);

});




// Import Routes

const paypalRoutes = require("./routes/paypal");


// If you create these later keep them here
// const productRoutes = require("./routes/products");
// const orderRoutes = require("./routes/orders");
// const authRoutes = require("./routes/auth");



// API Routes

app.use("/api/paypal", paypalRoutes);


// Future routes

// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/auth", authRoutes);




// Default Route

app.get("/", (req,res)=>{

    res.json({

        message:"Premium T-Shirt Store API Running"

    });

});





// Error Handling

app.use((err,req,res,next)=>{

    console.error(err.stack);

    res.status(500).json({

        message:"Something went wrong"

    });

});




// Server Port

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});