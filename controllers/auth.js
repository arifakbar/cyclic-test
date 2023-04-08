const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");

exports.CreateOrUpdateUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOneAndUpdate(
      { email: email },
      { email: email },
      { new: true }
    );
    if (user) {
      res.status(201).json({
        data: user,
        mesage: "User updated successfully",
      });
    } else {
      const newUser = new User({
        email: email,
        name: email.split("@")[0],
      });
      await newUser.save();
      res.status(201).json({
        data: user,
        mesage: "User created successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json({
      data: user,
      message: "User fetched successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};

exports.updateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name: username },{ new: true }
    );
    res.status(201).json({
      data: user,
      message: "Username updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { address } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { address: address },{ new: true }
    );
    res.status(201).json({
      data: user,
      message: "Address updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};

exports.sendOTP = async (req, res, next) => {
  const { number } = req.body;
  try {
    console.log("number : " + number);
    res.status(200).json({ data: number, message: "OTP sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { number, OTP } = req.body;
  try {
    console.log("number : " + number);
    console.log("OTP : " + OTP);
    res
      .status(200)
      .json({ data: number, message: "Phone number updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.userCart = async (req, res, next) => {
  try {
    const { cart } = req.body;
    let products = [];
    const user = await User.findOne({ email: req.user.email });
    //Check if cart of user already exists.
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id });
    if (cartExistByThisUser) {
      await cartExistByThisUser.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = [];
      object.product = cart[i]._id; //Product
      object.count = cart[i].count; //Quantity

      //Get Price for creating total
      let productFromDb = await Product.findById(cart[i]._id);
      object.price = productFromDb.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }
    let newCart = new Cart({
      products: products,
      cartTotal: cartTotal,
      orderedBy: user._id,
    });
    await newCart.save();
    return res
      .status(200)
      .json({ ok: true, message: "Cart saved in database successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ orderedBy: user._id }).populate(
      "products.product"
    );
    res
      .status(200)
      .json({ data: cart, message: "Fetched user cart successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteUserCart = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    await Cart.findOneAndDelete({ orderedBy: user._id });
    res.status(200).json({ ok: true, message: "Cart deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.applyDiscountCoupon = async (req, res, next) => {
  try {
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      return res.status(200).json({ err: "Invalid Coupon" });
    }
    const user = await User.findOne({ email: req.user.email });
    let { products, cartTotal } = await Cart.findOne({
      orderedBy: user._id,
    }).populate("products.product");

    //Calculate total after discount

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount: totalAfterDiscount },
      { new: true }
    );
    res.status(201).json({
      data: totalAfterDiscount,
      message: "Coupon applied successfully",
    });
  } catch (err) {
    console.log(err);
    res.send(500).json({ err: "Some error occured" });
  }
};

exports.userWishlists = async (req, res, next) => {
  try {
    const products = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist");
    res
      .status(200)
      .json({ data: products, message: "User wishlist fetched successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } },
      { new: true }
    );
    res
      .status(201)
      .json({ ok: true, message: "Product added to wishlist successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: productId } },
      { new: true }
    );
    res.status(201).json({
      ok: true,
      message: "Product removed from wishlist successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
