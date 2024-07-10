const express = require("express");
const app = express();
require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

// Parses JSON body-requests
const bodyParser = require("body-parser");

// How to add Controller / API Endpoints:
// const CONTROLLER = require('./controllers/CONTROLLER_NAME')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// How to add controller to application
// app.use('/CONTROLLER', CONTROLLER)

app.listen(PORT, function () {
  console.log(`Listening on PORT 3001`);
});
