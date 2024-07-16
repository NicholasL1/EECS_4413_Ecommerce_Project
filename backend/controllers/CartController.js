const express = require("express");
const router = express.Router();

const CartService = require("../services/CartService.js");

router.post("/addToCart", async (req, res) => {
  const { shoe_id, cart_id } = req.body;

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

router.post("/removeFromCart", async (req, res) => {
  const { shoe_id, cart_id } = req.body;

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

router.post("/updateQuantity", async (req, res) => {
  const { qty, shoe_id, cart_id } = req.body;

  try {
    const response = await CartService.updateQuantity(qty, shoe_id, cart_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/checkout", async (req, res) => {
  const { cart_id } = req.body;

  try {
    const response = await CartService.checkout(cart_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
