const ShoeModel = require("../models/ShoeModel");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");

class OrderService {
  /**
   * ToDo -- Get user_id from JWT
   * @param {JSON} Shoes -- {id: (qty, price), ...}
   */
  static async CreateOrder(Shoes, user_id) {
    try {
      let total = 0;

      const order = await OrderModel.create({
        user_id: user_id,
        shoes: Shoes,
        total: total,
        date: new Date(),
      });

      if (!order) {
        throw new Error("Order Could Not Be Created");
      }

      for (const [shoe_id, value] of Shoes.entries()) {
        const { qty, price } = value;

        // check if qty <= qty in DB
        const shoe = await ShoeModel.findById(shoe_id);
        const currentStock = shoe.get("stock");

        // remove qty from DB if qty <= qty in DB
        if (qty > currentStock)
          throw new Error("[Error] - One or more items are out of stock");

        total += price * qty;
        shoe.set("stock", currentStock - qty);
        await shoe.save();
      }

      order.set("total", total);
      await order.save();

      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = OrderService;
