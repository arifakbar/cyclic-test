const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
