const express = require("express");
const router = express.Router();
const Cart = require("../models/CartModel");
const User = require("../models/UserModel.js");
const app = express();
const CartService = require('../services/CartService.js')

const UserService = require("../services/UserService.js");
const { generateToken } = require("../config/generateToken.js");
const verifyToken = require("../config/verifyToken.js");

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email); // Log the received email

  // Check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await UserService.login(email, password); // Attempt login
    
    req.session.loggedIn = true
    req.session.user = user
    req.session.save()

    const session_cart = req.session.cart

    if (session_cart) {
      await CartService.addGuestCartToRegisteredCart(session_cart, user.cart_id)
    }

    res.status(201).json({
      token: generateToken(
        user._id,
        user.cart_id,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address,
        user.isAdmin
      ),
    });
  } catch (error) {
    console.error("Error during login:", error.message); // Log any errors
    if (error.message === "Invalid Login Credentials") {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/Logout", async (req, res) => {
  req.session.destroy()
  req.session = null
  res.status(200)
});

router.post("/Register", async (req, res) => {
  const { email, password, first_name, last_name, address } = req.body;

  // check if all fields are filled
  if (!email || !password || !first_name || !last_name || !address) {
    res.status(400).json({ message: "Please include all fields" });
  }

  // call UserService to register
  // temp ==> const response =
  const newCart = await Cart.create({});
  try {
    const user = await UserService.register(
      newCart._id,
      email,
      password,
      first_name,
      last_name,
      address
    );

    // ToDo -- store generated token on the client-side
    req.session.loggedIn = true
    req.session.user = user
    req.session.save()

    res.status(201).json({
      token: generateToken(
        user._id,
        user.cart_id,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address,
        user.isAdmin
      ),
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/Account/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      is_admin: user.is_admin,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/UpdateUser", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userData[0];

    const { update } = req.body;

    if (!userId || !update) {
      return res.status(400).json({ message: "ID and update is required" });
    }

    const user = await UserService.updateUser(userId, update);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in the database" });
    }

    res.status(201).json({
      message: "Update Successful",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
