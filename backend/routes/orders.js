const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Get single order
router.get("/:id", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;
router.delete("/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.json({
            message: "Order deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.get("/stats/summary", async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments();

        const totalRevenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        res.json({
            totalOrders,
            totalRevenue:
                totalRevenue.length > 0
                    ? totalRevenue[0].total
                    : 0
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});