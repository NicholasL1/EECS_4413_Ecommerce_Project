const ShoeModel = require("../models/ShoeModel");
const OrderModel = require("../models/OrderModel");

class OrderService {
  /**
   *
   * @param {JSON} Shoes -- {id: (qty, price), ...}
   */
  static async CreateOrder(Shoes) {
    /*
    Called form /Shopping/checkout
    Payload is similar to ShoeIDObject = {
                            shoeId: (qty, price),
                            shoeId2: (qty2, price2),
                            ...
                        }
    Search through the DB
        check if the qty <= qty in DB
            if not return error
        remove qty from qty in DB
        Add item to OrderTable
    */

    const Shoes = req.body.ShoeIDObject;
    const shoe_ids = Object.keys(Shoes);

    for (let shoe_id in Shoes) {
      if (Shoes.hasOwnProperty(shoe_id)) {
        const { qty, price } = Shoes[shoe_id];

        // check if qty <= qty in DB
        const shoe = ShoeModel.findById(shoe_id);
        const currentStock = shoe.get("stock");

        // remove qty from DB if qty <= qty in DB
        if (qty > currentStock)
          throw new Error("[Error] - One or more items are out of stock");

        shoe.set("stock", currentStock - qty);
        await shoe.save();
      }
    }

    // Calculate the total

    // Insert value in OrderTable

    return "[Success] - Order has been placed";
  }
}

module.exports = OrderService;
