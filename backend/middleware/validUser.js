require("dotenv").config();

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET;

const authoriseUser = async (req, res, next) => {
  const { authorization } = req.headers;

  //if no authorization
  if (!authorization) {
    return res.status(400).json({ error: "Authorisation required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const result = jwt.verify(token, jwtSecret);
    req.email = result.email;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Request is not authorised" });
  }
};

module.exports = authoriseUser;
