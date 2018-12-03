const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://hagosgir:" + process.env.MONGO_ATLAS_PW + "@cluster0-xzsjx.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/images", express.static(path.join(__dirname, "images")));
  app.use("/", express.static(path.join(__dirname, "angular")));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

  app.use("/api/message", messageRoutes);
  app.use("/api/posts", postsRoutes);
  app.use("/api/user", userRoutes);
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
  });

  module.exports = app;
