const express = require("express");
const {
  getGroups,
  createGroup,
  getUserGroup,
  closeGroup,
} = require("../controller/groupController");
const router = express.Router();

router.get("/solo", getUserGroup);

router.get("/:canteenId", getGroups);

router.post("/", createGroup);

router.patch("/close", closeGroup);

module.exports = router;
