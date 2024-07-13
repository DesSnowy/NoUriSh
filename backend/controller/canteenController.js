const db = require("../database/db");
const {
  selectUserFromEmail,
  selectAllGroups,
  selectAllCanteens,
} = require("../database/query");
const { mapCanteenForView } = require("../utils/functions");

const getCanteens = async (req, res) => {
  try {
    console.log("fetching canteen");
    const email = req.email;
    const user = await selectUserFromEmail(email);
    residence = user.residence;

    const groups = (await selectAllGroups()).filter(
      (group) => group.residence == residence
    );
    const canteens = await selectAllCanteens();
    const augCanteens = canteens.map((canteen) => ({
      ...canteen,
      activeGroup: groups.filter(
        (group) => group.canteen_id == canteen.canteen_id
      ).length,
    }));
    res.status(200).json(augCanteens.map(mapCanteenForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error!" });
  }
};

const addCanteen = async (req, res) => {
    const { canteenName, canteenImage } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO "canteen" (canteen_name, canteen_image) VALUES ($1, $2) RETURNING *',
            [canteenName, canteenImage]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getCanteens, addCanteen };
