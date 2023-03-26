const express = require("express");

const router = express.Router();
const orderController = require("../controllers/order");
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/user/order", [authCheck], orderController.createOrder);

router.get("/user/orders", [authCheck], orderController.getUserOrder);

router.get("/orders/total", orderController.ordersCount);

router.post("/orders", [authCheck, adminCheck], orderController.getAllOrders);

router.put(
  "/order/:orderId",
  [authCheck, adminCheck],
  orderController.updateOrderStatus
);

router.post("/user/cash-order", [authCheck], orderController.createCashOrder);

router.get("/order/:orderId", [authCheck], orderController.getOrderStatus);

module.exports = router;
