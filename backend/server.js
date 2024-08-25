// Dependencies
const express = require("express");
const dotenv = require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const memoryStore = new session.MemoryStore();

// Config
const connectDB = require("./config/db");

// Port env variable
const PORT = process.env.PORT || 3001;

// Controllers
// const CONTROLLER = require('./controllers/CONTROLLER_NAME')
const User = require("./controllers/UserController.js");
const Cart = require("./controllers/CartController.js");
const Order = require("./controllers/OrderController.js");
const Payment = require("./controllers/PaymentController.js");
const Product = require("./controllers/ProductController.js");
const Admin = require("./controllers/AdminController.js");
const Review = require("./controllers/ReviewController.js");

// Connect to database
connectDB();

const app = express();

app.use(
  cors({
    origin: "https://6ixkicks.vercel.app", // Allow requests from your frontend
    credentials: false, // Allow cookies and other credentials
    methods: "GET, POST, PUT, DELETE, OPTIONS", // Specify allowed methods
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Specify allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {};
  }
  if (req.session.loggedIn === undefined) {
    req.session.loggedIn = false;
  }
  next();
});

// app.use((req, res, next) => {
//   if (!req.sessionStore.cart) {
//     req.sessionStore.cart = {};
//   }
//   if (req.sessionStore.loggedIn === undefined) {
//     req.sessionStore.loggedIn = false;
//   }
//   next();
// });

// How to add controller to application
// app.use('/CONTROLLER', CONTROLLER)
app.use("/User", User);
app.use("/Cart", Cart);
app.use("/Order", Order);
app.use("/Payment", Payment);
app.use("/Product", Product);
app.use("/Admin", Admin);
app.use("/Review", Review);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to shoe store" });
});

app.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`);
});
