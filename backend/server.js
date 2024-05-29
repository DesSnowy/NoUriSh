const express = require("express");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const cors = require("cors");

require("dotenv").config();

//express app
const app = express();

//middle ware

//allowing queries to server
app.use(cors());

//adding req.body to req
app.use(express.json());

//routes
app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
