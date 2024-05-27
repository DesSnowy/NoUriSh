//GET all orders
const getOrders = (req, res) => {
  res.status(200).json({ orders: "show all order here" });
};

//GET a single order
const getSingleOrder = (req, res) => {
  res.status(200).json({ order: "single order here" });
};

//CREATE a new order
const createOrder = (req, res) => {
  res.status(200).json({ result: "created a new order" });
};

//DELETE an order
const deleteOrder = (req, res) => {
  res.status(200).json({ result: "delted an order" });
};

//UPDATE an order
const updateOrder = (req, res) => {
  res.status(200).json({ result: "order updated" });
};

module.exports = {
  getOrders,
  getSingleOrder,
  createOrder,
  deleteOrder,
  updateOrder,
};
