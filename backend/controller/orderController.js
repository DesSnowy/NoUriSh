const db = require("../database/db");

//GET all orders
const getOrders = async (req, res) => {
  try {
    const results = await db.query('select * from "order";');
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET a single order
const getSingleOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.query('SELECT * from "order" WHERE id = $1;', [
      id,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//CREATE a new order
const createOrder = async (req, res) => {
  const { canteen, stall, foodItem, price, user_id, tele } = req.body;
  try {
    const results = await db.query(
      'INSERT INTO "order" (canteen, stall, fooditem, price, tele) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [canteen, stall, foodItem, price, tele]
    );

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//DELETE an order
const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await db.query('DELETE FROM "order" where id = $1', [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//UPDATE an order
const updateOrder = async (req, res) => {
  try {
    const { canteen, stall, foodItem, price, user_id, tele } = req.body;
    const id = req.params.id;
    const results = await db.query(
      'UPDATE "order" SET canteen = $1, stall = $2, fooditem = $3, price = $4, tele = $5 where id = $6 returning *',
      [canteen, stall, foodItem, price, user_id, tele, id]
    );

    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getOrders,
  getSingleOrder,
  createOrder,
  deleteOrder,
  updateOrder,
};
