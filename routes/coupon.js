const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const couponController = require("../controllers/coupon");

router.get("/coupons", [authCheck, adminCheck], couponController.getAllCoupons);

router.get(
  "/coupon/:couponId",
  [authCheck, adminCheck],
  couponController.getCoupon
);

router.post("/coupon", [authCheck, adminCheck], couponController.addCoupon);

router.delete(
  "/coupon/:couponId",
  [authCheck, adminCheck],
  couponController.deleteCoupon
);

module.exports = router;
