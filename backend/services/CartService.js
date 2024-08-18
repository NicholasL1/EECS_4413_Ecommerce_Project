const CartDAO = require("../dao/CartDAO");
const Shoe = require('../models/ProductModel')
const Cart = require('../models/CartModel')

class CartService {

  static async addGuestCartToRegisteredCart(session_cart, cart_id) {
    const response = await CartDAO.addGuestCartToRegisteredCart(session_cart, cart_id)
    return response
  }

  static async getCart(isGuest, cart_id = null, cart = null ) {
    let response;
    if (isGuest) {
      response = await CartDAO.getCart(isGuest, cart)
    } else {
      const cart_from_db = await Cart.findById(cart_id)
      response = await CartDAO.getCart(false, cart_from_db)
    }
    return response
  }

  /**
   * 
   * @param {string} shoe_id 
   * @param {Object} cart 
   */
  static async addToGuestCart(shoe_id, cart) {
      const response = await CartDAO.addToGuestCart(shoe_id, cart)
      return response
  }

  static async addToRegisteredCart(shoe_id, cart_id) {
    const response = await CartDAO.addToRegisteredCart(shoe_id, cart_id)
    return response
  }

  static async removeFromGuestCart(shoe_id, cart) {
    const response = await CartDAO.removeFromGuestCart(shoe_id, cart)
    return response
  }

  static async removeFromRegisteredCart(shoe_id, cart_id) {
    const response = await CartDAO.removeFromRegisteredCart(shoe_id, cart_id)
    return response 
  }

  static async updateGuestCartQuantity(qty, shoe_id, cart) {
    const response = await CartDAO.updateGuestCartQuantity(qty, shoe_id, cart)
    return response
  }

  static async updateRegisteredCartQuantity(qty, shoe_id, cart_id) {
    const response = await CartDAO.updateRegisteredCartQuantity(qty, shoe_id, cart_id)
    return response
  }

  static async checkout(cart_id, user_id, payment_id) {
    // Calls createOrder endpoint to create order in DB
    // Clears the cart
    const response = await CartDAO.checkout(cart_id, user_id, payment_id);
    return response;
  }
}

module.exports = CartService;
