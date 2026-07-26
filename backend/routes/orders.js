const express = require("express");

const router = express.Router();


// Test order route
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Order route is working"
    });
});


module.exports = router;