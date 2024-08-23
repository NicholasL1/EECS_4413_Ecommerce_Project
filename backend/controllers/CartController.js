const express = require("express");
const router = express.Router();
const CartService = require("../services/CartService.js");
const verifyToken = require('../config/verifyToken.js')

router.get('/GetCart', async (req, res) => {
  const loggedIn = req.session.loggedIn

  if (!loggedIn) {
    return res.status(201).send(req.session.cart)
  } 
  
  else {
    const cart_id = req.session.user.cart_id
    const session_cart = req.session.cart
    const response = await CartService.getCart(false, cart_id)
    
    req.session.cart = response
    req.session.save()
    
    return res.status(201).json(response)
  }
})

router.post("/AddToCart", async (req, res) => {
  const loggedIn = req.session.loggedIn
  const cart = req.session.cart || {}
  const {shoe_id} = req.body 
  try {

    if (!loggedIn) {
      const response = await CartService.addToGuestCart(shoe_id, cart)
      
      // store updated cart into session
      req.session.cart = response.data
      req.session.save()

      return res.status(201).json({message: response.message, data: req.session.cart})
    } 
    
    else {
      const cart_id = req.session.user.cart_id
      const response = await CartService.addToRegisteredCart(shoe_id, cart_id)
      
      req.session.cart = response.data
      req.session.save()
      
      return res.status(201).json({message: response})
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

router.post("/RemoveFromCart", async (req, res) => {
  const { shoe_id } = req.body;
  const loggedIn = req.session.loggedIn
  const cart = req.session.cart || {}

  try {

    if (!loggedIn) {
      const response = await CartService.removeFromGuestCart(shoe_id, cart)
      req.session.cart = response.data
      req.session.save()

      return res.status(200).json({message: response.message, data: req.session.cart})

    } else {
      const cart_id = req.session.user.cart_id
      const response = await CartService.removeFromRegisteredCart(shoe_id, cart_id)  
      
      req.session.cart = response.data
      req.session.save()
      
      return res.status(200).json({message: response.message, data: response.data})
    }

  } catch (err) {
    console.log(err)
    return res.status(401).json({message: err.message, data: null})
  }
  
});

router.post("/UpdateQuantity", async (req, res) => {
  const { qty, shoe_id } = req.body;
  const loggedIn = req.session.loggedIn
  const cart = req.session.cart || {}
  
  try {

    if (!loggedIn) {
      const response = await CartService.updateGuestCartQuantity(qty, shoe_id, cart)
      req.session.cart = response.data
      req.session.save()

      return res.status(200).json({message: response.message, data: req.session.cart})
    } 
    
    else {
      const cart_id = req.session.user.cart_id
      const response = await CartService.updateRegisteredCartQuantity(qty, shoe_id, cart_id)
      
      req.session.cart = response.data
      req.session.save()
      
      return res.status(200).json({message: response.message, data: response.data})
    }

  } catch (err) {
    return res.status(401).json({message: err.message, data: null})
  }
});

// Endpoint called under the "My Cart" page after user clicks the "Checkout" button
router.post("/Checkout", verifyToken, async (req, res) => {
  const loggedIn = req.session.loggedIn

  if (!loggedIn) {
    req.session.redirectToCheckout = true
    req.session.save()

    return res.status(200).json({message: 'Sign-up or Login to checkout your items', redirectToCheckout: true})
  }

  const { payment_id } = req.body;
  const cart_id = req.session.user.cart_id
  const user_id = req.session.user._id

  try {
    const response = await CartService.checkout(cart_id, user_id, payment_id);
    
    if (response === "error") {
      return res.status(200).json({message: "Credit Card Authorization Failed"})
    }

    req.session.cart = {}
    
    res.status(201).json({
      message: response,
    });



  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get('/VerifyCheckout', async (req, res) => {
  const cart = req.session.cart || {}
  const loggedIn = req.session.loggedIn
  
  if (!loggedIn) {
    return res.status(200).json({message: 'Sign-up / Login to checkout your items', data: cart})
  }

  try {
    const response = await CartService.verifyCheckout(cart)
    return res.status(200).json({message: response.message, data: response.data})
  } catch (err) {
      return res.status(500).json({message: 'Internal Server Error @ VerifyCheckout', data: cart})
  }
})

router.post('/ClearCart', async (req, res) => {
  const loggedIn = req.session.loggedIn

  if (!loggedIn) {
    req.session.cart = {}
    req.session.save()
    return res.status(201).json({message: '', data: req.session.cart})
  } else {
    const cart_id = req.session.user.cart_id
    try {
      const response = await CartService.clearCart(cart_id)
      req.session.cart = {}
      req.session.save()
      return res.status(200).json({message: response.message, data: response.data})
    } catch (err) {
      console.log(err)
      return res.status(401).json({message: err.message, data: []})
    }
  }
})

module.exports = router;
