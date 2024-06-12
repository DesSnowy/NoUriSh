const express = require("express");
const router = express.Router();

const { getCanteens } = require("../controller/canteenController");

router.get("/", getCanteens);

module.exports = router;
