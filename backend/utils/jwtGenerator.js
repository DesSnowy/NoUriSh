require("dotenv").config();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const jwtGenerator = (email) => {
  return jwt.sign({ email }, jwtSecret, { expiresIn: "3d" });
};

module.exports = jwtGenerator;
