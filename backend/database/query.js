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

const updateOrderStatus = async (orderId, newStatus) => {
  const results = await db.query(
    `UPDATE "order" SET status = $1 where order_id = $2 returning *`,
    [newStatus, orderId]
  );
  return results.rows[0];
};


const resetDB = async () => {
  const result = await db.query(`
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "user" (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT,
    name VARCHAR(255),
    tele VARCHAR(50),
    residence VARCHAR(50),
    isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE "canteen" (
    canteen_id SERIAL PRIMARY KEY,
    canteen_name VARCHAR(50),
    canteen_image VARCHAR(500)
);

CREATE TABLE "stall" (
    stall_id SERIAL PRIMARY KEY,
    stall_name VARCHAR(50),
    canteen_id int,
    CONSTRAINT fk_canteen FOREIGN KEY(canteen_id) REFERENCES canteen(canteen_id)
);

CREATE TABLE "food" (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(50),
    price FLOAT NOT NULL,
    stall_id int,
    description VARCHAR(255),
     CONSTRAINT fk_stall FOREIGN KEY(stall_id) REFERENCES stall(stall_id)
);

CREATE TABLE "group" (
    group_id SERIAL PRIMARY KEY,
    canteen_id int,
    residence VARCHAR(50),
    status BOOLEAN,
    incomplete BOOLEAN,
    user_email VARCHAR(255),
    CONSTRAINT fk_canteen FOREIGN KEY(canteen_id) REFERENCES canteen(canteen_id),
    CONSTRAINT fk_user FOREIGN KEY(user_email) REFERENCES "user"(email)
);

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    canteen VARCHAR(50),
    stall VARCHAR(50),
    fooditem VARCHAR(50),
    user_email VARCHAR(255),
    group_id INT,
    quantity INT,
    price FLOAT,
    status VARCHAR(50),
    created_time TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_email) REFERENCES "user"(email)
);

INSERT INTO canteen (canteen_name, canteen_image)VALUES
('frontier', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/Frontier-Canteen-1024x684.jpg'),
('deck', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/deck.jpg');

INSERT INTO stall (stall_name, canteen_id) VALUES
('chinese_frontier', 1),
('korean_frontier', 1),
('western_deck', 2),
('pasta_deck', 2),
('Japanese_deck', 2);

INSERT INTO food (food_name, price, stall_id, description) VALUES
('Chicken Rice', 3.5, 1, 'Tender chicken served with aromatic rice and savory sauce.'),
('Chicken Noodle',3.5, 1, 'Succulent chicken with flavorful noodles in a savory broth.'),
('Korean Chicken', 5, 2, 'Crispy, spicy Korean-style chicken with a tangy sauce.'),
('Fish N Chip', 4, 3, 'Crispy battered fish served with golden fries and tartar sauce.'),
('Carbonara Pasta', 5, 4, 'Creamy pasta with pancetta, egg, and Parmesan cheese.'),
('Kimbap', 4, 2, 'Korean rice rolls filled with vegetables, meat, and egg.'),
('Ginseng Chicken Soup', 4, 2,'Hearty Korean soup with tender chicken, ginseng, and aromatic herbs.'),
('Chicken Katsu Don', 4.5, 5, 'Crispy chicken cutlet served over rice with savory sauce and egg.');


INSERT INTO "user" VALUES
('test123@test.com', '$2b$10$ZK/aOSzuezgKps6ISJsMpOZNChlYcJoTWXcGnY9GMaJwPX/2zDLFC', 'tester', 'test123', 'PGP', false),
('admin@admin.com', '$2b$10$ZK/aOSzuezgKps6ISJsMpOZNChlYcJoTWXcGnY9GMaJwPX/2zDLFC', 'admin', 'admin', 'PGP', true);

INSERT INTO "group" (canteen_id, residence, status, incomplete, user_email) VALUES
(1, 'PGP', true, true,'test123@test.com'),
(2, 'Tembusu', true, true,'test123@test.com');`);
};
module.exports = {
  selectUserFromEmail,
  selectAllGroups,
  selectAllCanteens,
  insertGroup,
  selectActiveGroupsFromEmail,
  closeGroupFromEmail,
  completeGroupFromEmail,
  updateOrderStatus,
  resetDB,
};
