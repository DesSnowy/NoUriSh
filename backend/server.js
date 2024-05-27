const express = require("express");
const orderRoutes = require("./routes/order");

//express app
const app = express();

//middle ware
app.use(express.json());

//routes
app.use("/api/orders", orderRoutes);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
