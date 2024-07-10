const express = require("express");
const app = express();
const mongoose = require("mongoose");

// ToDo -- Might need to supply professor with these values?
// Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc
require("dotenv").config();

// Parses JSON body-requests
const bodyParser = require("body-parser");

// How to add Controller / API Endpoints:
// const CONTROLLER = require('./controllers/CONTROLLER_NAME')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// How to add controller to application
// app.use('/CONTROLLER', CONTROLLER)

app.listen(3001, function () {
  console.log(`Listening on PORT 3001`);
});
