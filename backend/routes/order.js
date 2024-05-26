const express = require("express");

const router = express.Router();

//GET all order
router.get("/", () => {
  console.log("GET all order");
});

//get a single order
router.get("/:id", () => {
  console.log("GET a single order");
});

//POST a new order
router.post("/", () => {
  console.log("POST a new order");
});

//DELETE an order
router.delete("/:id", () => {
  console.log("DELETE an order");
});

//UPDATE an order
router.patch("/:id", () => {
  console.log("UPDATE an order");
});

module.exports = router;
