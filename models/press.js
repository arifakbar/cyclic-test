const mongoose = require("mongoose");

const { Schema } = mongoose;

const pressSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Press", pressSchema);
