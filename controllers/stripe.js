const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../models/user");
const Cart = require("../models/cart");

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { couponApplied } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id,
    });
    console.log("totalAfterDiscount " + totalAfterDiscount);
    let finalAmount = 0;
    if (couponApplied && totalAfterDiscount) {
      finalAmount = totalAfterDiscount * 100;
    } else {
      finalAmount = cartTotal * 100;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "inr",
    });
    res.status(200).json({
      data: {
        clientSecret: paymentIntent.client_secret,
        cartTotal: cartTotal,
        totalAfterDiscount: totalAfterDiscount,
        payable: finalAmount,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
