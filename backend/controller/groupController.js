const {
  selectAllGroups,
  insertGroup,
  selectUserFromEmail,
} = require("../database/query");
const { checkAllNotNull, mapGroupForView } = require("../utils/functions");

const getGroups = async (req, res) => {
  const email = req.email;
  const { canteenId } = req.params;
  try {
    const user = await selectUserFromEmail(email);
    const residence = user.residence;
    const groups = await selectAllGroups();

    const filteredGroups = groups
      .filter((group) => group.residence == residence)
      .filter((group.canteen_id = canteenId));

    res.status(200).json(filteredGroups.map(mapGroupForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const createGroup = async (req, res) => {
  const email = req.email;
  const { canteen_id, residence } = req.body;
  if (!checkAllNotNull(canteen_id, residence)) {
    return res.status(500).json({ error: "all fields must be filled" });
  }
  try {
    const newGroup = await insertGroup(email, canteen_id, residence);
    res.status(200).json(mapGroupForView(newGroup));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = { getGroups, createGroup };
