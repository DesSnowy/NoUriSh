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

const insertGroup = async (email, canteen_id, residence) => {
  const results = await db.query(
    'INSERT INTO "group" (canteen_id, residence, status, user_email) VALUES ($1, $2, $3, $4) RETURNING *',
    [canteen_id, residence, true, email]
  );
  return results.rows[0];
};
module.exports = {
  selectUserFromEmail,
  selectAllGroups,
  selectAllCanteens,
  insertGroup,
};
