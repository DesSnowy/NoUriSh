const express = require("express");
const orderRoutes = require("./routes/orders");
require("dotenv").config();

//express app
const app = express();

//middle ware

//adding req.body to req
app.use(express.json());

//routes
app.use("/api/orders", orderRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
