const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: { type: String, default: "" },
    phoneNumber: { type: Number, default: 0 },

    wishlist: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
