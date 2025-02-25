const express = require("express");
const cors = require("cors");
const authoriseUser = require("./middleware/validUser");

const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/user");
const canteenRoutes = require("./routes/canteen");
const stallRoutes = require("./routes/stall");
const foodItemRoutes = require("./routes/foodItem");
const groupRoutes = require("./routes/group");

require("dotenv").config();

//express app
const app = express();

//middle ware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }
  next();
});

//allowing queries to server
app.use(cors());

//adding req.body to req
app.use(express.json());

//routes
app.use("/api/user", userRoutes);

app.use("/api", authoriseUser);

app.use("/api/order", orderRoutes);

app.use("/api/canteen", canteenRoutes);

app.use("/api/stall", stallRoutes);

app.use("/api/food", foodItemRoutes);

app.use("/api/group", groupRoutes);

module.exports = app;
