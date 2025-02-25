const express = require("express");
const router = express.Router();

const { getCanteens, addCanteen } = require("../controller/canteenController");

router.get("/", getCanteens);

router.post("/", addCanteen);

module.exports = router;
