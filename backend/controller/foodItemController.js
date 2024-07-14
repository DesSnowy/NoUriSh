const db = require("../database/db");
const { mapItemForView, checkAllNotNull } = require("../utils/functions");

const getFoodItems = async (req, res) => {
  try {
    const { stallId } = req.params;
    console.log("fetching items");
    const results = await db.query(
      `SELECT food.food_id, food.food_name, food.price, food.description, stall.stall_name, canteen.canteen_name, canteen.canteen_id
      FROM "food"
      INNER JOIN "stall" ON food.stall_id = stall.stall_id
      INNER JOIN "canteen" ON stall.canteen_id = canteen.canteen_id
      WHERE stall.stall_id = $1;`,
      [stallId]
    );
    const items = results.rows;
    res.status(200).json(items.map(mapItemForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

const addFood = async (req, res) => {
  const { foodName, price, stallId } = req.body;

  if (!checkAllNotNull(foodName, price, stallId)) {
    return res.status(400).json({ error: "all field must be filled!" });
  }

  try {
    const result = await db.query(
      'INSERT INTO "food" (food_name, price, stall_id) VALUES ($1, $2, $3) RETURNING *',
      [foodName, price, stallId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getFoodItems, addFood };
