const ShoeModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const OrderDAO = require('../dao/OrderDAO')
const ProductDAO = require('../dao/ProductDAO')
const AdminDAO = require('../dao/AdminDAO')

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
  static async GetSalesStats() {
    const allOrders = await OrderModel.find();

    const shoeStats = {
      // shoe : total qty sold, total price
    };

    shoeStats["totals"] = {total_sales: 0, total_sold: 0, total_products: 0, total_customers: 0, total_orders: 0}
    shoeStats["shoes"] = {}
    
    
    /*
    dates: {
      2024: [AAA, BBB, CCC, ...],
      ...
    }
    */
    shoeStats["dates"] = this.initDatesForSalesStats()

    shoeStats.totals.total_orders = allOrders.length // # of orders

    const totalProducts = await ProductDAO.fetchAll()
    shoeStats.totals.total_products = totalProducts.length // total # of product

    const totalUsers = await AdminDAO.getAllUsers()
    shoeStats.totals.total_customers = totalUsers.length

    for (let i = 0; i < allOrders.length; i++) {
      const order = allOrders[i];
      const shoes = order.shoes;

      // Go through all the shoes in the order object
      for (const [shoe_id, info] of shoes.entries()) {
        const user = await UserModel.findOne({ _id: order.user_id });

        if (shoe_id in shoeStats.shoes) {
          const total_qty = shoeStats.shoes[shoe_id].qty + info.qty;
          const total_price = info.price * total_qty;

          shoeStats.shoes[shoe_id].qty = total_qty;
          shoeStats.shoes[shoe_id].price = total_price;

          if (!this.isUserInList(user, shoeStats.shoes[shoe_id].users)) {
            shoeStats.shoes[shoe_id].users.push(user)
          }

        } else {
          const shoe = await ShoeModel.findOne({ _id: shoe_id });
          shoeStats.shoes[shoe_id] = {
            qty: info.qty,
            price: info.qty * info.price,
            shoe: shoe,
            users: [user],
          };
        }

        const ordered_date = new Date(order.date)

        /*
        dates: {
          2020: {
            qty_sold: [],
            profit_per_month: []
          }
        }
        */

        const profit = info.qty * info.price

        const monthData = shoeStats.dates[ordered_date.getFullYear()]
        monthData.qty_sold[ordered_date.getMonth()] += info.qty
        monthData.profit[ordered_date.getMonth()] += profit

        shoeStats.totals.total_sales += profit;
        shoeStats.totals.total_sold += info.qty;
      }
    }

    shoeStats.totals.total_sales = '$' + shoeStats.totals.total_sales.toLocaleString()

    const prev_shoeStats_data = shoeStats.shoes
    const new_shoeStats_data = []
    
    for (const key of Object.keys(prev_shoeStats_data))
      new_shoeStats_data.push(prev_shoeStats_data[key])

    shoeStats.shoes = new_shoeStats_data

    return shoeStats;
  }

  static isUserInList(user, list) {
    const new_email = user.email
    const some = list.some((u) => {return u.email === new_email})
    return some
  }

  /**
   * 
   * @param {JSON[]} dates 
   */
  static initDatesForSalesStats() {
    
    const sales_data = {}
  
    for (let i = 2024; i >= 2020; i--) {
      sales_data[i] = {qty_sold: [], profit: []}
      for (let j = 0; j < 12; j++) {
        sales_data[i].qty_sold.push(0)
        sales_data[i].profit.push(0)
      }
    }

    return sales_data
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