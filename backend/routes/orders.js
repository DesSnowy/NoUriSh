const express = require("express");
const router = express.Router();

const {
  getOrders,
  getSingleOrder,
  getOrdersByGroupId,
  createOrder,
  deleteOrder,
  patchOrder,
  patchOrderStatus,
} = require("../controller/orderController");

//GET all order
router.get("/", getOrders);

//GET a single order
router.get("/:id", getSingleOrder);

//GET orders with a specific group ID
router.get("/group/:groupId", getOrdersByGroupId);

//POST a new order
router.post("/", createOrder);

//DELETE an order
router.delete("/:id", deleteOrder);

//UPDATE an order
router.patch("/:id", patchOrder);

router.patch("/:orderId/status", patchOrderStatus);

module.exports = router;
