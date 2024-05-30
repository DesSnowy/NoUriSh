const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const results = await db.query('SELECT * from "user" where email = $1', [
      email,
    ]);

    // if email already existed
    if (results.rows.length > 0) {
      return res.status(400).json({ error: "user already exist!" });
    }

    // if email is new, create an account
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    const token = jwtGenerator(email);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db.query('SELECT * from "user" where email = $1', [
      email,
    ]);

    // if email does not exist
    if (results.rows.length == 0) {
      return res.status(400).json({ error: "email does not exist!" });
    }

    const hashedPassword = results.rows[0].password;

    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    if (!isCorrectPassword) {
      return res.status(400).json({ error: "incorrect password!" });
    }
    const token = jwtGenerator(email);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
