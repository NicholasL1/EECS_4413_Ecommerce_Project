// Dependencies
const express = require("express");
const dotenv = require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc

// Controllers
// const CONTROLLER = require('./controllers/CONTROLLER_NAME')
const User = require("./controllers/UserController.js");
const Cart = require("./controllers/CartController.js");
const Order = require("./controllers/OrderController.js");
const Payment = require("./controllers/PaymentController.js");

// Config
const connectDB = require("./config/db");

// Port env variable
const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// How to add controller to application
// app.use('/CONTROLLER', CONTROLLER)
app.use("/User", User);
app.use("/Cart", Cart);
app.use("/Order", Order);
app.use("/Payment", Payment);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to shoe store" });
});

app.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`);
});
