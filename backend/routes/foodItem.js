const express = require("express");
const router = express.Router();

const { getFoodItems, addFood } = require("../controller/foodItemController");

router.get("/:stallId", getFoodItems);

router.post("/", addFood);

module.exports = router;
