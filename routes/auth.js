const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const authController = require("../controllers/auth");

router.post(
  "/create-or-update-user",
  [authCheck],
  authController.CreateOrUpdateUser
);

router.post("/current-user", [authCheck], authController.currentUser);

router.post(
  "/current-admin",
  [authCheck, adminCheck],
  authController.currentUser
);

router.post("/update-username", [authCheck], authController.updateUsername);

router.post("/update-address", [authCheck], authController.updateAddress);

router.post("/user/sendOTP", [authCheck], authController.sendOTP);

router.post("/user/verifyOTP", [authCheck], authController.verifyOTP);

router.post("/user/cart", [authCheck], authController.userCart);

router.get("/user/cart", [authCheck], authController.getUserCart);

router.delete("/user/cart", [authCheck], authController.deleteUserCart);

router.post(
  "/user/cart/coupon",
  [authCheck],
  authController.applyDiscountCoupon
);

router.post("/user/wishlist", [authCheck], authController.addToWishlist);

router.put(
  "/user/wishlist/:productId",
  [authCheck],
  authController.removeFromWishlist
);

router.get("/user/wishlists", [authCheck], authController.userWishlists);

module.exports = router;
