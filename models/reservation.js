const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const resesrvationSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlenght: 32 },
    seats: { type: Number, required: true, default: 1 },
    reservationDateTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Processing"],
      default: "Processing",
    },
    reservedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", resesrvationSchema);
