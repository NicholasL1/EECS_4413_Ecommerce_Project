const CartDAO = require("../dao/CartDAO");

class CartService {
  /**
   * @param: {shoe_id}
   * @returns: String confirmation message
   */
  static async addToCart(shoe_id, cart_id) {
    const response = await CartDAO.addToCart(shoe_id);
    return response;
  }

  /** Called when the user decrements the quantity of the shoe in their cart to 0
   * @param: {shoe_id}
   * @returns: String confirmation message
   */
  static async removeFromCart(shoe_id, cart_id) {
    const response = await CartDAO.removeFromCart(shoe_id, cart_id);
    return response;
  }

  static async updateQuantity(qty, shoe_id, cart_id) {
    const response = await CartDAO.updateQuantity(qty, shoe_id, cart_id);
    return response;
  }

  /**
   * @param {user.id, shoe_id: ShoeIDObject, total, date}
   * ShoeIDObject = {
      shoeId: (qty, price),
      shoeId2: (qty2, price2)
    }
   * @returns: String confirmation message
   */
  static async checkout(cart_id) {
    // Calls createOrder endpoint to create order in DB
    // Clears the cart
    const response = await CartDAO.checkout(cart_id);
    return response;
  }
}
