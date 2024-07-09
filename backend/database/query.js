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
  const results = await db.query('SELECT * from "group" where status = true;');
  return results.rows;
};

const selectActiveGroupsFromEmail = async (email) => {
  const results = await db.query(
    `SELECT "group".group_id, "group".canteen_id, "group".residence, "group".user_email, "group".status, "group".incomplete, canteen.canteen_name
    FROM "group"
    INNER JOIN canteen ON "group".canteen_id = canteen.canteen_id
    WHERE "group".incomplete = true AND "group".user_email = $1`,
    [email]
  );
  return results.rows;
};

const selectAllCanteens = async () => {
  const results = await db.query('SELECT * from "canteen";');
  return results.rows;
};

const insertGroup = async (email, canteen_id, residence) => {
  const results = await db.query(
    'INSERT INTO "group" (canteen_id, residence, status, incomplete, user_email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [canteen_id, residence, true, true, email]
  );
  return results.rows[0];
};

const closeGroupFromEmail = async (email) => {
  const results = await db.query(
    'UPDATE "group" SET status = false WHERE user_email = $1 RETURNING *',
    [email]
  );
  return results.rows[0];
};


const completeGroupFromEmail = async (email) => {
  const results = await db.query(
    `UPDATE "group" SET status = false, incomplete = false WHERE user_email = $1 RETURNING *`,
    [email]
  );
  return results.rows[0];
};

module.exports = {
  selectUserFromEmail,
  selectAllGroups,
  selectAllCanteens,
  insertGroup,
  selectActiveGroupsFromEmail,
  closeGroupFromEmail,
  completeGroupFromEmail,
};
