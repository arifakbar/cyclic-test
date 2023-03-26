const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const uniqueid = require("uniqueid");

exports.createOrder = async (req, res, next) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email });
    let { products } = await Cart.findOne({ orderedBy: user._id });
    const newOrder = new Order({
      products: products,
      orderedBy: user._id,
      paymentIntent: paymentIntent,
    });
    await newOrder.save();
    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    await Product.bulkWrite(bulkOption, {});
    res.status(200).json({ ok: true, message: "Order created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const { page } = req.body;
    const currentPage = page || 1;
    const perPage = 15;
    const orders = await Order.find()
      .skip((currentPage - 1) * perPage)
      .populate("products.product")
      .sort({ createdAt: 1 })
      .limit(perPage);
    res
      .status(200)
      .json({ data: orders, message: "Fetched orders successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getUserOrder = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const orders = await Order.find({ orderedBy: user._id }).populate(
      "products.product"
    );
    res
      .status(200)
      .json({ data: orders, message: "Fetched user orders successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.ordersCount = async (req, res, next) => {
  try {
    const total = await Order.find().estimatedDocumentCount();
    res.status(200).json({
      data: total,
      message: "Total Products count fetched successfully.",
    });
  } catch (err) {
    console.log(err);
    res.send(500).json({ err: "Some error occured" });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: orderStatus },
      { new: true }
    );
    res.status(201).json({
      data: updatedOrder,
      message: "order status updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.createCashOrder = async (req, res, next) => {
  try {
    const { COD, couponApplied } = req.body;
    if (!COD) return res.status(400).send("Cash on delivery order failed.");

    const user = await User.findOne({ email: req.user.email });
    const userCart = await Cart.findOne({ orderedBy: user._id });

    let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount * 100;
    } else {
      finalAmount = userCart.cartTotal * 100;
    }

    let newOrder = new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqueid(),
        amount: finalAmount,
        currency: "inr",
        created: Date.now(),
        payment_method_types: ["cash"],
        status: "Cash On Delivery",
      },
      orderStatus: "Cash On Delivery",
      orderedBy: user._id,
    });

    await newOrder.save();

    let bulkOptions = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: {
            _id: item.product._id,
          },
          update: {
            $inc: {
              quantity: -item.count,
              sold: +item.count,
            },
          },
        },
      };
    });

    await Product.bulkWrite(bulkOptions, {});

    res.status(200).json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    res.status(200).json({
      data: order.orderStatus,
      message: "Order status fetched sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
