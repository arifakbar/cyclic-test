const express = require("express");

const router = express.Router();
const { authCheck } = require("../middlewares/auth");
const stripeController = require("../controllers/stripe");

router.post(
  "/create-payment-intent",
  [authCheck],
  stripeController.createPaymentIntent
);

module.exports = router;
