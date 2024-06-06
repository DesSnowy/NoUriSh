const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { checkAllNotNull } = require("../utils/functions");

const signupUser = async (req, res) => {
  const { email, password, name, tele, residence } = req.body;
  console.log(req.body);
  if (!checkAllNotNull(email, password, name, tele, residence)) {
    return res.status(400).json({ error: "all field must be filled!" });
  }

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
      'INSERT INTO "user" (email, password, name, tele, residence) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, hashedPassword, name, tele, residence]
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
  if (!checkAllNotNull(email, password)) {
    return res.status(400).json({ error: "all field must be filled!" });
  }

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

const getUserDetail = async (req, res) => {
  const email = req.email;
  try {
    const results = await db.query('SELECT * from "user" where email = $1', [
      email,
    ]);
    if (results.rows.length == 0) {
      return res.status(400).json({ error: "user does not exist" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

const updateUserDetail = async (req, res) => {
  const email = req.email;
  const { name, tele, residence } = req.body;
  if (!checkAllNotNull(name, tele, residence)) {
    return res.status(400).json({ error: "all field must be filled!" });
  }
  const results = await db.query(
    'UPDATE "user" SET name = $1, tele = $2, residence = $3 where email = $4 returning *',
    [name, tele, residence, email]
  );
  const order = results.rows[0];
  res.status(200).json(order);
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};
module.exports = {
  signupUser,
  loginUser,
  getUserDetail,
  updateUserDetail,
};
