const mapOrderForView = (order) => {
  return {
    id: order.order_id,
    canteen: order.canteen,
    stall: order.stall,
    foodItem: order.fooditem,
    quantity: order.quantity,
    group: order.group_id,
    price: order.price,
    createdAt: order.created_time,
    userEmail: order.user_email,
    orderStatus: order.status,
    groupEmail: order.group_email,
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
    email: group.user_email,
    residence: group.residence,
    canteen_id: group.canteen_id,
    canteen_name: group.canteen_name,
    status: group.status,
    incomplete: group.incomplete,
  };
};

const mapUserForView = (user) => {
  return {
    email: user.email,
    name: user.name,
    tele: user.tele,
    residence: user.residence,
    isAdmin: user.isadmin,
  };
};

module.exports = {
  mapOrderForView,
  checkAllNotNull,
  mapCanteenForView,
  mapStallForView,
  mapItemForView,
  mapGroupForView,
  mapUserForView,
};
