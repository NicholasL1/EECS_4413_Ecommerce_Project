const ShoeModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const OrderDAO = require('../dao/OrderDAO')

class OrderService {
  /**
   * ToDo -- Get user_id from JWT
   * @param {JSON} Shoes -- {id: (qty, price), ...}
   */
  static async CreateOrder(Shoes, user_id, payment_id) {
    try {
      let total = 0;

      if (Shoes.size == 0) {
        throw new Error("Cart is Empty");
      }

      const order = await OrderModel.create({
        user_id: user_id,
        shoes: Shoes,
        payment: payment_id,
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
          throw new Error("One or more items are out of stock");

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

  static async CancelOrder(orderID) {
    try {
      const result = await OrderModel.findByIdAndDelete({ _id: orderID });

      if (!result) {
        throw new Error("Order not found");
      }

      return "Order deleted";
    } catch (err) {
      throw new Error("Order with that ID does not exists");
    }
  }

  static async UserOrderHistory(user_id) {
    try {
      const result = await OrderModel.find({ user_id: user_id });
      return result;
    } catch (err) {
      console.log(
        "[ERROR] - Something went wrong retrieving the UserOrderHistory..."
      );
      console.log(err);
    }

    // Return empty array if any errors occured
    return [];
  }

  static async StoreOrderHistory(user_id) {
    const user = await UserModel.findOne({ _id: user_id });

    if (!user.isAdmin) {
      throw new Error("Cannot be accessed, only accessible to Admins");
    }

    const allOrders = await OrderModel.find();
    return allOrders;
  }

  /**
   * Currently returns the qty sold and total price per shoe and the total quantities and total price sold throughout
   * @param {*} user_id
   * @returns
   */
  static async GetSalesStats(user_id) {
    const user = await UserModel.findOne({ _id: user_id });

    if (!user.isAdmin) {
      throw new Error("Cannot be accessed, only accessible to Admins");
    }

    const allOrders = await OrderModel.find();

    const shoeStats = {
      // shoe : total qty sold, total price
    };

    shoeStats["total_sales"] = 0;
    shoeStats["number_sold"] = 0;

    for (let i = 0; i < allOrders.length; i++) {
      const order = allOrders[i];
      const shoes = order.shoes;

      // Go through all the shoes in the order object
      for (const [shoe_id, info] of shoes.entries()) {
        const user = await UserModel.findOne({ _id: order.user_id });

        if (shoe_id in shoeStats) {
          const total_qty = shoeStats[shoe_id].qty + info.qty;
          const total_price = info.price * total_qty;

          shoeStats[shoe_id].qty = total_qty;
          shoeStats[shoe_id].price = total_price;
          shoeStats[shoe_id].users.push(user);
        } else {
          const shoe = await ShoeModel.findOne({ _id: shoe_id });
          shoeStats[shoe_id] = {
            qty: info.qty,
            price: info.qty * info.price,
            shoe: shoe,
            users: [user],
          };
        }

        shoeStats["total_sales"] += info.qty * info.price;
        shoeStats["number_sold"] += info.qty;
      }
    }
    return shoeStats;
  }

  static async GetAllOrders() {
    try {
      const orders = await OrderDAO.GetAllOrders()
      return orders
    } catch (err) {
      return err.message
    }
  }

}

module.exports = OrderService;
``