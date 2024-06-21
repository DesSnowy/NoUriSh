const express = require("express");
const router = express.Router();

const { getFoodItems } = require("../controller/foodItemController");

router.get("/:stallId", getFoodItems);

module.exports = router;
