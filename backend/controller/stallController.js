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

module.exports = { getStalls };
