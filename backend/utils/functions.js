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

module.exports = { mapOrderForView, checkAllNotNull };
