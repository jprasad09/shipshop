const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your coupoun code name!"],
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    },
    minAmount: {
        type: Number,
    },
    maxAmount: {
        type: Number,
    },
    shopId: {
        type: String,
        required: true,
    },
    selectedProduct: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("CouponCode", couponCodeSchema);