const mapOrderForView = (order) => {
  return {
    id: order.id,
    canteen: order.canteen,
    stall: order.stall,
    foodItem: order.fooditem,
    price: order.price,
    tele: order.tele,
  };
};

const checkAllNotNull = (...items) => {
  return items.every(
    (item) => item !== undefined && item !== null && item !== ""
  );
};

const mapCanteenForView = (canteen) => {
  return {
    id: canteen.canteen_id,
    name: canteen.canteen_name,
    image: canteen.canteen_image,
    activeGroups: canteen.activeGroup,
  };
};

const mapStallForView = (stall) => {
  return {
    id: stall.stall_id,
    name: stall.stall_name,
  };
};

const mapItemForView = (item) => {
  return {
    name: item.food_name,
    price: item.price,
    description: item.description,
    id: item.food_id,
    stall_name: item.stall_name,
    canteen_name: item.canteen_name,
    canteen_id: item.canteen_id,
  };
};

const mapGroupForView = (group) => {
  return {
    id: group.group_id,
    user: group.user_email,
    residence: group.residence,
    canteen_id: group.canteen_id,
  };
};

module.exports = {
  mapOrderForView,
  checkAllNotNull,
  mapCanteenForView,
  mapStallForView,
  mapItemForView,
  mapGroupForView,
};
