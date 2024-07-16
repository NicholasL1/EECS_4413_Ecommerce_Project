const Cart = require("../models/CartModel");
const Shoe = require("../models/ShoeModel");
const OrderService = require("./OrderService");

class CartDAO {
  // Add shoes to cart
  static async addToCart(shoe_id, cart_id) {
    /*
    Check if cart exists, if it does retrieve it
    get the shoe price and set quantity to 1
    shoe --> query to find price
    */
    const cart = await Cart.findById(cart_id);
    if (cart) {
      const shoe = await Shoe.findById(shoe_id);
      cart.shoes.set(shoe._id.toString(), { qty: 1, price: shoe.price });

      // save cart
      await cart.save();
      return "Item added to cart.";
    } else {
      return "Error retrieving shopping cart.";
    }
  }

  static async removeFromCart(shoe_id, cart_id) {
    /**
     * Check if the cart exists, if it does then retrieve it
     * Remove the shoe from the cart and save the cart
     */
    const cart = await Cart.findById(cart_id);
    if (cart) {
      cart.shoes.delete(shoe_id);
      await cart.save();
      return "Item removed from cart.";
    } else {
      return "Error retrieving shopping cart.";
    }
  }

  static async updateQuantity(qty, shoe_id, cart_id) {
    /**
     * Check if the cart exists, if it does then retrieve it
     * Update the quantity of the shoe in the cart
     */
    const cart = await Cart.findById(cart_id);
    const shoe = await Shoe.findById(shoe_id);
    if (cart) {
      cart.shoes.set(shoe_id, { qty: qty, price: shoe.price });
      await cart.save();
      return "Quantity updated";
    } else {
      return "Error retrieving shopping cart.";
    }
  }

  static async checkout(cart_id) {
    /**
     * Check if the cart exists, if it does then retrieve it
     * Send the cart information to order
     */
    const cart = await cart.findById(cart_id);
    if (cart) {
      const response = await OrderService.CreateOrder(cart.shoes);
      return response;
    } else {
      throw new Error("Error checking out.");
    }
  }
}
