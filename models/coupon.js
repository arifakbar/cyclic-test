const mongoose = require("mongoose");

const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      unique: true,
      uppercase: true,
      minlength: [6, "Too Short"],
      maxlength: [16, "Too Long"],
    },
    expiry: { type: Date, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
