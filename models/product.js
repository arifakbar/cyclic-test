const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
      text: true,
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: {
      type: String,
      required: true,
      text: true,
      minlength: [2, "Too Short"],
      maxlength: [2000, "Too Long"],
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: [32, "Too long"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subCategory: [{ type: ObjectId, ref: "SubCategory" }],
    quantity: Number,
    sold: { type: Number, default: 0 },
    images: Array,
    veg: { type: Boolean, default: true },
    ratings: [{ star: Number, postedBy: { type: ObjectId, ref: "User" } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
