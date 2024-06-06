const express = require("express");
const authoriseUser = require("../middleware/validUser");

// controller functions
const {
  loginUser,
  signupUser,
  getUserDetail,
  updateUserDetail,
} = require("../controller/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

//Verify user first
router.use(authoriseUser);

router.get("/", getUserDetail);

Router.patch("/", updateUserDetail);

module.exports = router;
