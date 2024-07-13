const db = require("../database/db");
const { mapStallForView } = require("../utils/functions");
const getStalls = async (req, res) => {
  try {
    const { canteenId } = req.params;
    console.log("fetching stalls");
    console.log(canteenId);

    const results = await db.query(
      'select * from "stall" where canteen_id = $1;',
      [canteenId]
    );
    const stalls = results.rows;
    res.status(200).json(stalls.map(mapStallForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

const addStall = async (req, res) => {
  const { stallName, canteenId } = req.body;

  try {
      const result = await pool.query(
          'INSERT INTO "stall" (stall_name, canteen_id) VALUES ($1, $2) RETURNING *',
          [stallName, canteenId]
      );
      res.status(201).json(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getStalls, addStall };
