const express = require("express");
const mongoose = require("mongoose");
const buyerControllers = require("./controllers/buyer-controllers");
const dealerControllers = require("./controllers/dealer-controllers");
const userControllers = require("./controllers/user-controller");
const propertyControllers = require("./controllers/property-controller");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
///databse connection

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());
///buyer routes
//a simple comment
app.post("/api/add-buyer", buyerControllers.addBuyer);
///dealer routes
app.post("/api/add-dealer", dealerControllers.addDealer);
//user routes
app.get("/api/get-user", userControllers.getUser);
//property routes
app.post("/api/add-property", propertyControllers.addProperty);
app.get("/api/get-properties", propertyControllers.getProperties);
app.get("/api/get-property", propertyControllers.getProperty);
app.get(
  "/api/get-featured-properties",
  propertyControllers.getFeaturedProperties
);
app.get("/api/get-hello", propertyControllers.getTempMessage);
app.listen(3000, () => {
  console.log("server is listening...");
});
//
