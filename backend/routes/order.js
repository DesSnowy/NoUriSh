const express = require("express");

const router = express.Router();

const {
  getOrders,
  getSingleOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/orderController");

//GET all order
router.get("/", getOrders);

//get a single order
router.get("/:id", getSingleOrder);

//POST a new order
router.post("/", createOrder);

//DELETE an order
router.delete("/:id", deleteOrder);

//UPDATE an order
router.patch("/:id", updateOrder);

module.exports = router;
