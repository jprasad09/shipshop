const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");
const router = express.Router();

// create coupoun code
router.post(
    "/create-coupon-code",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const isCoupounCodeExists = await CouponCode.find({
                name: req.body.name,
            });

            if (isCoupounCodeExists.length !== 0) {
                return next(new ErrorHandler("Coupon code already exists", 400));
            }

            const coupounCode = await CouponCode.create(req.body);

            res.status(201).json({
                success: true,
                coupounCode,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// get all coupons of a shop
router.get(
    "/get-coupon/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const couponCodes = await CouponCode.find({ shopId: req.seller.id });
            res.status(201).json({
                success: true,
                couponCodes,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// delete coupoun code of a shop
router.delete(
    "/delete-coupon/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

            if (!couponCode) {
                return next(new ErrorHandler("Coupon code doesn't exist", 400));
            }
            res.status(201).json({
                success: true,
                message: "Coupon code deleted successfully",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// get coupon code value by its name
router.get(
    "/get-coupon-value/:name",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const couponCode = await CouponCode.findOne({ name: req.params.name });

            res.status(200).json({
                success: true,
                couponCode,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;