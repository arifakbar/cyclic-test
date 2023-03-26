const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
