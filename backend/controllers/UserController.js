const express = require("express");
const router = express.Router();
const Cart = require("../models/CartModel");

const UserService = require("../services/UserService.js");
const { generateToken } = require("../config/generateToken.js");
const verifyToken = require("../config/verifyToken.js");

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    res.status(400).send("Please enter all fields");
  }

  /*
logs in 
gen jwt 
return jwt back to client
store jwt on local storage (client side)
*/

  // call UserService to login
  try {
    const user = await UserService.login(email, password); // send login info
    res.status(201).json({
      token: generateToken(
        user._id,
        user.cart_id,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address
      ),
    });
  } catch (error) {
    if (error.message === "Invalid Login Credentials") {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/Logout", async (req, res) => {});

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
    res.status(201).json({
      token: generateToken(
        user._id,
        user.cart_id,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address
      ),
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
