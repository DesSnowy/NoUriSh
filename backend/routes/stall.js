const express = require("express");
const router = express.Router();

const { getStalls } = require("../controller/stallController");

router.get("/:canteenId", getStalls);

module.exports = router;
