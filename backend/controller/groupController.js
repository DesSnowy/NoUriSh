const {
  selectAllGroups,
  insertGroup,
  selectUserFromEmail,
  selectActiveGroupsFromEmail,
  closeGroupFromEmail,
  completeGroupFromEmail,
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
      .filter((group) => group.canteen_id == canteenId);

    res.status(200).json(filteredGroups.map(mapGroupForView));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getUserGroup = async (req, res) => {
  console.log(req.email);
  const email = req.email;
  try {
    const groups = await selectActiveGroupsFromEmail(email);
    console.log(groups);
    if (groups.length == 0) {
      return res.status(200).json("user does not have any active orders");
    }
    return res.status(200).json(groups[0]);
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

const closeGroup = async (req, res) => {
  const email = req.email;
  try {
    const group = await closeGroupFromEmail(email);
    console.log("group closed");
    res.status(200).json(mapGroupForView(group));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};


const completeGroup = async (req, res) => {
  const email = req.email;
  try {
    const group = await completeGroupFromEmail(email);
    console.log("group completed");
    res.status(200).json(mapGroupForView(group));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server erroe" });
  }
};
module.exports = {
  getGroups,
  createGroup,
  getUserGroup,
  closeGroup,
  completeGroup,
};

