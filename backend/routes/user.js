const express = require("express");
const authoriseUser = require("../middleware/validUser");

// controller functions
const {
  loginUser,
  signupUser,
  getUserDetail,
  getUserDetailByEmail,
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

//get a user's profile using their email
router.get('/:userEmail', getUserDetailByEmail);

router.patch("/", updateUserDetail);

module.exports = router;
