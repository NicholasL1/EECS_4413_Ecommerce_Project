const express = require("express");
const router = express.Router();

const CartService = require("../services/CartService.js");
const verifyToken = require("../config/verifyToken.js");

router.get('/GetCart', async (req, res) => {
  const loggedIn = req.sessionStore.loggedIn
  
  if (!loggedIn) {
    return res.status(201).send(req.sessionStore.cart)
  } 
  
  else {
    const cart_id = req.sessionStore.user.cart_id
    const session_cart = req.sessionStore.cart
    
    if (session_cart) {
      await CartService.addGuestCartToRegisteredCart(session_cart, cart_id)
    }

    const response = await CartService.getCart(false, cart_id)
    return res.status(201).json(response)
  }
})

router.post("/AddToCart", async (req, res) => {
  const { shoe_id } = req.body;
  const loggedIn = req.sessionStore.loggedIn
  const cart = req.sessionStore.cart || {}

  try {

    if (!loggedIn) {
      const response = await CartService.addToGuestCart(shoe_id, cart)
      
      // store updated cart into session
      req.sessionStore.cart = response.data
      return res.status(201).json({message: response.message, data: req.sessionStore.cart})
    } 
    
    else {
      const cart_id = req.sessionStore.user.cart_id
      const response = await CartService.addToRegisteredCart(shoe_id, cart_id)
      return res.status(201).json({message: response})
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

router.post("/RemoveFromCart", async (req, res) => {
  const { shoe_id } = req.body;
  const loggedIn = req.sessionStore.loggedIn
  const cart = req.sessionStore.cart || {}

  try {

    if (!loggedIn) {
      const response = await CartService.removeFromGuestCart(shoe_id, cart)
      req.sessionStore.cart = response.data
      return res.status(200).json({message: response.message, data: req.sessionStore.cart})

    } else {
      const cart_id = req.sessionStore.user.cart_id
      const response = await CartService.removeFromRegisteredCart(shoe_id, cart_id)  
      return res.status(200).json({message: response.message, data: response.data})
    }

  } catch (err) {
    console.log(err)
    return res.status(401).json({message: err.message, data: null})
  }
  
});

router.post("/UpdateQuantity", async (req, res) => {
  const { qty, shoe_id } = req.body;
  const loggedIn = req.sessionStore.loggedIn
  const cart = req.sessionStore.cart || {}
  
  try {

    if (!loggedIn) {
      const response = await CartService.updateGuestCartQuantity(qty, shoe_id, cart)
      req.sessionStore.cart = response.data
      return res.status(200).json({message: response.message, data: req.sessionStore.cart})
    } 
    
    else {
      const cart_id = req.sessionStore.user.cart_id
      const response = await CartService.updateRegisteredCartQuantity(qty, shoe_id, cart_id)
      return res.status(200).json({message: response.message, data: response.data})
    }

  } catch (err) {
    return res.status(401).json({message: err.message, data: null})
  }
});

// Endpoint called under the "My Cart" page after user clicks the "Checkout" button
router.post("/Checkout", async (req, res) => {
  const loggedIn = req.sessionStore.loggedIn

  if (!loggedIn) {
    req.sessionStore.redirectToCheckout = true
    return res.status(200).json({message: 'Sign-up or Login to checkout your items', redirectToCheckout: true})
  }

  const { payment_id } = req.body;
  const cart_id = req.sessionStore.user.cart_id
  const user_id = req.sessionStore.user.user_id

  try {
    const response = await CartService.checkout(cart_id, user_id, payment_id);
    res.status(201).json({
      message: response,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/ClearCart', async (req, res) => {
  const loggedIn = req.sessionStore.loggedIn

  if (!loggedIn) {
    req.sessionStore.cart = []
    return res.status(201).json({message: '', data: req.sessionStore.cart})
  } else {
    const cart_id = req.sessionStore.user.cart_id
    try {
      const response = await CartService.clearCart(cart_id)
      req.sessionStore.cart = []
      return res.status(200).json({message: response.message, data: response.data})
    } catch (err) {
      console.log(err)
      return res.status(401).json({message: err.message, data: []})
    }
  }
})

module.exports = router;
