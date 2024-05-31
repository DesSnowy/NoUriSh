const express = require("express");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const cors = require("cors");

require("dotenv").config();

//express app
const app = express();

//middle ware

app.use((req, res) => {
  //set header first to allow request or origin domain (value can be different)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );

  //---- other code

  //Preflight CORS handler
  if (req.method === "OPTIONS") {
    return res.status(200).json({
      body: "OK",
    });
  }
});

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

app.use("/api/orders", orderRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
