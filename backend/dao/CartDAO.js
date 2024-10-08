const Cart = require("../models/CartModel");
const Shoe = require("../models/ProductModel");
const OrderService = require("../services/OrderService");
const PaymentModel = require("../models/PaymentModel");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");

class CartDAO {

  /**
   * Adds the shoes from GUEST session cart to newly logged-in user's cart
   * Invoked on Login and Register
   * @param {Object} session_cart 
   * @param {string} cart_id 
   */
  static async addGuestCartToRegisteredCart(session_cart, cart_id) {
    const cart = await Cart.findById(cart_id);
    
    if (!cart.shoes) 
      cart.shoes = new Map();
    
    for (const [shoe_id, item] of Object.entries(session_cart)) {
      
      if (cart.shoes.has(shoe_id)) {

        const curr_qty = cart.shoes.get(shoe_id).qty
        cart.shoes.set(shoe_id, { qty: item.qty + curr_qty, price: item.price });

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

      if (!shoes)
        return response

      for (const [id, item] of shoes) {
        const shoe = await Shoe.findById(id)
        if (shoe)
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
    const shoe = await Shoe.findById(shoe_id)
    
    if (shoe.stock === 0)
      return {message: 'Shoe is out of stock for that quantity', data: cart}
    
    if (!(shoe_id in cart)) {
      cart[shoe_id] = {qty: 1, price: shoe.price}
    } else {
      const curr_qty = cart[shoe_id].qty + 1
      if (curr_qty > shoe.stock)
        return {message: 'Shoe is out of stock for that quantity', data: cart}

      cart[shoe_id] = {qty: cart[shoe_id].qty + 1, price: shoe.price}
    }

    const response = await this.getCart(true, cart)

    return {message: 'Added to Cart', data: response}
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

    const curr_qty = ((cart.shoes.get(shoe._id))?.qty || 0) + 1
    if (curr_qty > shoe.stock)
      return {message: 'Shoe is out of stock for that quantity', data: cart}

    cart.shoes.set(shoe._id.toString(), { qty: curr_qty, price: shoe.price });
    await cart.save()

    const response = await this.getCart(false, cart)

    return {message: 'Added to Cart', data: response}
  } 

  /**
   * 
   * @param {string} shoe_id 
   * @param {Object} cart 
   */
  static async removeFromGuestCart(shoe_id, cart) {
    delete cart[shoe_id]
    const response = await this.getCart(true, cart)
    return {message: 'Item removed from Cart', data: response}
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
      return {message: 'Item Removed from Cart', data: response}
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
    qty = parseInt(qty)

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
    qty = parseInt(qty)

    const cart = await Cart.findById(cart_id);
    const shoe = await Shoe.findById(shoe_id);
    
    if (cart) {

      if (qty == 0) {
        const response = await this.removeFromRegisteredCart(shoe_id, cart_id)
        return response
      }

      if (qty > shoe.stock || qty < 0)
        return {message: 'Shoe is out of stock for that quantity', data: cart}

      cart.shoes.set(shoe_id, { qty: qty, price: shoe.price });
      await cart.save();
      const response = await this.getCart(false, cart)
      return {message: '', data: response}
    }
    
    const response = await this.getCart(false, cart)
    return {message: 'Error updating quantity in shopping cart', data: response}
  }

  static async checkout(cart_id, user_id, payment_id, req) {
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
        req.session.order_id = order._id
        const response = "Order created.";
        cart.shoes = new Map(); // Clears the cart
        await cart.save();
        return response;
      }
    } else {
      return "Error checking out.";
    }
  }

  static async clearCart(cart_id) {
    const cart = await Cart.findById(cart_id)
    cart.shoes = new Map();
    await cart.save()
    return {message: '', data: []}
  }

  /**
   * 
   * @param {Object} cart 
   * @returns true if user can proceed to checkout, otherwise false
   */
  static async verifyCheckout(cart) {
    
    // Keep track amount of items, if 0 --> cart is empty, do not proceed with checkout
    let item_cnt = 0

    for (const [id, cart_info] of Object.entries(cart)) {

      const shoe = await Shoe.findById(id)
      const {qty, price} = cart_info
      
      if (!shoe)
        return {message: 'One or more items do not exist', data: cart}

      if (shoe) {
        const curr_stock = shoe.stock

        if (qty > curr_stock)
          return {message: 'One or more items are out of stock', data: cart}

        item_cnt++

      }
  
    }
  
    if (item_cnt > 0)
      return {message: '', data: cart}

    return {message: 'Cart cannot be Empty', data: cart}    
  }

  static async getOrderSummary(orderId, user_id) {
    const order = await OrderModel.findById(orderId)
    
    if (user_id != order.user_id) {
      return {order_info: null, payment_info: null, delivery_info: null, cart: null}
    }
    
    const payment_info = await PaymentModel.findById(order.payment)
    const address = await UserModel.findById(order.user_id)
    const cart = await this.getCart(false, order)
    return {order_info: order, payment_info: payment_info, delivery_info: address, cart: cart}
  }


}

module.exports = CartDAO;
