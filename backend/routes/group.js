const express = require("express");
const { getGroups, createGroup } = require("../controller/groupController");
const router = express.Router();

router.get("/:canteenId", getGroups);

router.post("/", createGroup);

module.exports = router;
