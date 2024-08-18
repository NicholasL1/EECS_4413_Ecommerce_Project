const Cart = require("../models/CartModel");
const Shoe = require("../models/ProductModel");
const OrderService = require("../services/OrderService");
const PaymentModel = require("../models/PaymentModel");

class CartDAO {

  static async addGuestCartToRegisteredCart(session_cart, cart_id) {
    const cart = await Cart.findById(cart_id);
    
    for (const [shoe_id, item] of Object.entries(session_cart)) {
      if (shoe_id in cart.shoes) {
        cart.shoes.set(shoe_id, { qty: item.qty + cart.shoes[shoe_id].qty, price: item.price });
      } else {
        cart.shoes.set(shoe_id, { ...item });
      }
    }

    await cart.save();
  }
  

  static async getCart(isGuest, cart) {
    if (isGuest) { // guest cart
      for (const [id, item] of Object.entries(cart)) {
        const shoe = await Shoe.findById(id)
        cart[id] = {...item, ...(shoe.toObject())}
      }
      return cart
    } else {
      const response = {}
      const shoes = cart.shoes
      for (const [id, item] of shoes) {
        const shoe = await Shoe.findById(id)
        response[id] = {...(item.toObject()), ...(shoe.toObject())}
      }
      return response
    }
  }

  /**
   * 
   * @param {string} shoe_id 
   * @param {Object} cart 
   */
  static async addToGuestCart(shoe_id, cart) {
    if (!(shoe_id in cart)) {
      const shoe = await Shoe.findById(shoe_id)
      if (shoe.stock === 0)
        return {message: 'Shoe is out of stock for that quantity', data: cart}
      cart[shoe_id] = {qty: 1, price: shoe.price}
    }

    const response = await this.getCart(true, cart)

    return {message: '', data: response}
  } 

  /**
   * 
   * @param {string} shoe_id 
   * @param {string} cart_id 
   */
  static async addToRegisteredCart(shoe_id, cart_id) {
    const cart = await Cart.findById(cart_id)
    
    if (!cart)
      return {message: 'Error retreiving cart', data: []}
    
    const shoe = await Shoe.findById(shoe_id);
    if (!cart.shoes) 
      cart.shoes = new Map();

    if (shoe.stock === 0)
      return {message: 'Shoe is out of stock for that quantity', data: cart}

    cart.shoes.set(shoe._id.toString(), { qty: 1, price: shoe.price });
    await cart.save()

    const response = await this.getCart(false, cart)

    return {message: '', data: response}
  } 

  /**
   * 
   * @param {string} shoe_id 
   * @param {Object} cart 
   */
  static async removeFromGuestCart(shoe_id, cart) {
    delete cart[shoe_id]
    const response = await this.getCart(true, cart)
    return {message: '', data: response}
  }

  /**
   * 
   * @param {string} shoe_id 
   * @param {string} cart_id 
   * @returns 
   */
  static async removeFromRegisteredCart(shoe_id, cart_id) {
    const cart = await Cart.findById(cart_id);
  
    if (cart) {
      cart.shoes.delete(shoe_id);
      await cart.save();
      const response = await this.getCart(false, cart)
      return {message: '', data: response}
    }
  
    return {message: 'Error retreiving cart', data: []}
  }

  /**
   * 
   * @param {number} qty 
   * @param {string} shoe_id 
   * @param {Object} cart 
   */
  static async updateGuestCartQuantity(qty, shoe_id, cart) {
    if (!(shoe_id in cart))
      return {message: '', data: cart}

    // Safer to query from DB instead of using shoe.stock value in cart since stock can be updated before-hand
    const shoe_in_db = await Shoe.findById(shoe_id)
    const shoe = cart[shoe_id]
    
    // Might pose problems, add min_value=1 to quantity to avoid this
    if (qty === 0) {
      const response = await this.removeFromGuestCart(shoe_id, cart)
      return response
    }
    
    if (qty > shoe_in_db.stock || qty < 0)
      return {message: 'Shoe is out of stock for that quantity', data: cart}
  
    shoe.qty = qty
    shoe.price = shoe.price

    const response = await this.getCart(true, cart)
    return {message: '', data: response} 
  }

  /**
   * 
   * @param {number} qty 
   * @param {string} shoe_id 
   * @param {string} cart_id 
   * @returns 
   */
  static async updateRegisteredCartQuantity(qty, shoe_id, cart_id) {
    const cart = await Cart.findById(cart_id);
    const shoe = await Shoe.findById(shoe_id);
    
    if (cart) {
      cart.shoes.set(shoe_id, { qty: qty, price: shoe.price });
      await cart.save();
      const response = await this.getCart(false, cart)
      return {message: '', data: response}
    }
    
    const response = await this.getCart(false, cart)
    return {message: 'Error updating quantity in shopping cart', data: response}
  }

  static async checkout(cart_id, user_id, payment_id) {
    /**
     * Check if the cart exists, if it does then retrieve it
     * Send the cart information to order
     */
    const cart = await Cart.findById(cart_id);
    if (cart) {
      try {
        await PaymentModel.findById(payment_id);
      } catch (error) {
        return "No Payment Option Provided";
      }

      const order = await OrderService.CreateOrder(
        cart.shoes,
        user_id,
        payment_id
      );

      if (order) {
        const response = "Order created.";
        cart.shoes = new Map(); // Clears the cart
        await cart.save();
        return response;
      }
    } else {
      return "Error checking out.";
    }
  }
}

module.exports = CartDAO;
