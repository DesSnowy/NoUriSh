const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrdersByGroupId,
  createOrder,
  patchOrderStatus,
} = require("../controller/orderController");

//GET all order
router.get("/", getOrders);

//GET orders with a specific group ID
router.get("/group/:groupId", getOrdersByGroupId);

//POST a new order
router.post("/", createOrder);

//UPDATE an order status
router.patch("/:orderId/status", patchOrderStatus);

module.exports = router;
