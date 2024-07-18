// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc

// Config
const connectDB = require("./config/db");

// Port env variable
const PORT = process.env.PORT || 3001;

// Controllers
// const CONTROLLER = require('./controllers/CONTROLLER_NAME')
const User = require("./controllers/UserController.js");
const Product = require("./controllers/ProductController.js");

// Connect to database
connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// How to add controller to application
// app.use('/CONTROLLER', CONTROLLER)
app.use("/User", User);
app.use("/Product", Product);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to shoe store" });
});

app.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`);
});
