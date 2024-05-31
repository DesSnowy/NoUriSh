require("dotenv").config();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const jwtGenerator = (email) => {
  console.log(jwtSecret);
  return jwt.sign({ email }, jwtSecret, { expiresIn: "3d" });
};

module.exports = jwtGenerator;
