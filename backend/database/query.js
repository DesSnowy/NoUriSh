const db = require("../database/db");

const selectUserFromEmail = async (email) => {
  const results = await db.query('select * from "user" where email = $1;', [
    email,
  ]);
  if (results.rowCount == 0) {
    throw new Error("user does not exist");
  }
  const user = results.rows[0];
  return user;
};

const selectAllGroups = async () => {
  const results = await db.query('SELECT * from "group";');
  return results.rows;
};

const selectAllCanteens = async () => {
  const results = await db.query('SELECT * from "canteen";');
  return results.rows;
};
module.exports = { selectUserFromEmail, selectAllGroups, selectAllCanteens };
