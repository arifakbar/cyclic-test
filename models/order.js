const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: ObjectId, ref: "Product" },
      count: Number,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: "Order Placed",
    enum: [
      "Order Placed",
      "Order Confirmation",
      "Prepration",
      "Cancelled",
      "Out For Delivery",
      "Cash On Delivery",
      "Completed",
    ],
  },
  orderedBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
