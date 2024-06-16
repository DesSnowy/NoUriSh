const db = require("../database/db");
const { mapItemForView } = require("../utils/functions");

const getFoodItems = async (req, res) => {
  try {
    const { stallId } = req.params;
    console.log("fetching items");
    const results = await db.query(
      'select * from "food" WHERE stall_id = $1;',
      [stallId]
    );
    const items = results.rows;
    res.status(200).json(items.map(mapItemForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

module.exports = { getFoodItems };
