const db = require("../database/db");
const { mapCanteenForView } = require("../utils/functions");

const getCanteens = async (req, res) => {
  try {
    console.log("fetching canteen");
    const results = await db.query('select * from "canteen";');
    const canteens = results.rows;
    res.status(200).json(canteens.map(mapCanteenForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

module.exports = { getCanteens };
