const express = require("express");
const router = express.Router();

const { getStalls, addStall } = require("../controller/stallController");

router.get("/:canteenId", getStalls);

router.post("/", addStall)

module.exports = router;
