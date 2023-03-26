const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
    },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    sentBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Contact", contactSchema);
