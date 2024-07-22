const db = require("../database/db");
const { updateOrderStatus } = require("../database/query");
const { mapOrderForView, checkAllNotNull } = require("../utils/functions");
//GET all orders
const getOrders = async (req, res) => {
  try {
    const email = req.email;
    const results = await db.query(
      `select o.*, g.user_email as group_email 
      FROM "order" o 
      JOIN "group" g on o.group_id = g.group_id 
      WHERE o.user_email = $1;`,
      [email]
    );
    const orders = results.rows;
    res.status(200).json(orders.map(mapOrderForView));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//GET orders with a specific group ID
const getOrdersByGroupId = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const results = await db.query(
      `SELECT o.*, u.name as user_name, u.email as user_email
      FROM "order" o
      JOIN "user" u ON o.user_email = u.email
      WHERE o.group_id = $1;`,
      [groupId]
    );
    const orders = results.rows;
    res.status(200).json(orders.map(mapOrderForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//CREATE a new order
const createOrder = async (req, res) => {
  const orderItems = req.body;
  const email = req.email;
  try {
    for (const order of orderItems) {
      const { canteen, stall, foodItem, price, quantity, group } = order;
      if (!checkAllNotNull(canteen, stall, foodItem, price, quantity, group)) {
        return res.status(400).json({ error: "all field must be filled!" });
      }
      const results = await db.query(
        `INSERT INTO "order" (canteen, stall, fooditem, price, quantity, group_id, user_email, status,created_time) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [canteen, stall, foodItem, price, quantity, group, email, "pending"]
      );
    }
    console.log(`${orderItems.length} item added `);
    res.status(200).json(`${orderItems.length} item added`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};



//UPDATE order status
const patchOrderStatus = async (req, res) => {
  try {
    console.log("updating order status");
    const { orderStatus } = req.body;
    const id = req.params.orderId;
    const order = await updateOrderStatus(id, orderStatus);
    res.status(200).json(mapOrderForView(order));
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

module.exports = {
  getOrders,
  getOrdersByGroupId,
  createOrder,
  patchOrderStatus,
};
