const Coupon = require("../models/coupon");

exports.getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ data: coupons, message: "Coupons fetched successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getCoupon = async (req, res, next) => {
  const { couponId } = req.params;
  try {
    const coupon = await Coupon.findById(couponId);
    res
      .status(200)
      .json({ data: coupon, message: "Coupon fetched successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.addCoupon = async (req, res, next) => {
  try {
    const { name, discount, expiry } = req.body;
    const newCoupon = new Coupon({
      name: name,
      discount: discount,
      expiry: expiry,
    });
    await newCoupon.save();
    res
      .status(201)
      .json({ data: newCoupon, message: "Coupon created successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    const { couponId } = req.params;
    await Coupon.findByIdAndDelete(couponId);
    res.status(201).json({ ok: true, message: "Coupon deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
