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
    description: "fase",
  };
};

module.exports = {
  mapOrderForView,
  checkAllNotNull,
  mapCanteenForView,
  mapStallForView,
  mapItemForView,
};
