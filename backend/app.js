const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
// const dotenv = require('dotenv');
// dotenv.config({
//     path: 'backend/config/config.env'
// })
const jwt = require("express-jwt");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.use(jwt({ secret: process.env.JWT_SECRET }));
const user = require("./routes/user");
app.use("/api/v1", user);
const admin = require("./routes/admin");
app.use("/api/v1", admin);
const reservation = require("./routes/reservation");
const { Console } = require("console");
app.use("/api/v1", reservation);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static("/app/frontend/public/build"));
  app.get("*", (req, res) => {
    res.sendFile("/app/frontend/public/build/index.html");
  });
}

module.exports = app;
