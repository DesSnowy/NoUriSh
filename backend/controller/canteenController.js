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

module.exports = { getCanteens };
