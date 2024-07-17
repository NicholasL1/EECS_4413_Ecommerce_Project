const express = require("express");
const router = express.Router();

const CartService = require("../services/CartService.js");
const verifyToken = require("../config/verifyToken.js");

router.post("/addToCart", verifyToken, async (req, res) => {
  const { shoe_id } = req.body;
  const cart_id = req.user.userData[1];

  // check if all fields are filled
  if (!shoe_id) {
    res.status(400);
    throw new Error("No shoe selected.");
  } else if (!cart_id) {
    res.status(400);
    throw new Error("You are not logged in.");
  }

  try {
    const response = await CartService.addToCart(shoe_id, cart_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/removeFromCart", verifyToken, async (req, res) => {
  const { shoe_id } = req.body;
  const cart_id = req.user.userData[1];

  // check if all fields are filled
  if (!shoe_id) {
    res.status(400);
    throw new Error("No shoe selected");
  }

  try {
    const response = await CartService.removeFromCart(shoe_id, cart_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/updateQuantity", verifyToken, async (req, res) => {
  const { qty, shoe_id } = req.body;
  const cart_id = req.user.userData[1];

  try {
    const response = await CartService.updateQuantity(qty, shoe_id, cart_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/checkout", verifyToken, async (req, res) => {
  const cart_id = req.user.userData[1];
  const user_id = req.user.userData[0];

  try {
    const response = await CartService.checkout(cart_id, user_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
