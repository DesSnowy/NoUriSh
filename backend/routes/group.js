const express = require("express");
const {
  getGroups,
  createGroup,
  getUserGroup,
  closeGroup,
  completeGroup,
} = require("../controller/groupController");
const router = express.Router();

router.get("/solo", getUserGroup);

router.get("/:canteenId", getGroups);

router.post("/", createGroup);

router.patch("/close", closeGroup);

router.patch("/complete", completeGroup);

module.exports = router;
