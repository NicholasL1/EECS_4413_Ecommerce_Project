const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const memoryStore = new session.MemoryStore();

const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

const User = require("./controllers/UserController.js");
const Cart = require("./controllers/CartController.js");
const Order = require("./controllers/OrderController.js");
const Payment = require("./controllers/PaymentController.js");
const Product = require("./controllers/ProductController.js");
const Admin = require("./controllers/AdminController.js");
const Review = require("./controllers/ReviewController.js");

connectDB();

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(
  cors({
    origin: /^https:\/\/6ixkicks\.vercel\.app$/,
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer");
  if (!req.session.cart) {
    req.session.cart = {};
  }
  if (req.session.loggedIn === undefined) {
    req.session.loggedIn = false;
  }
  next();
});

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
