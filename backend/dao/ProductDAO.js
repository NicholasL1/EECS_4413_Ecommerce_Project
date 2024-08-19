const Shoe = require("../models/ProductModel");
const mongoose = require("mongoose");

class ProductDAO {
  // Can construct the template string query here
  static async fetchShoes(query) {
    const shoes = await Shoe.find(query);
    return shoes;
  }

  static async fetchShoeById(product_id) {
    const objectId = new mongoose.Types.ObjectId(product_id);
    const shoe = await Shoe.findById(objectId);
    return shoe;
  }

  static async fetchAll() {
    const shoes = await Shoe.find();
    return shoes;
  }

  // need to update method to find the shoe with the productID that needs to be updated then use .set() to update the stock
  // const shoe = await shoe.findone({ _id: product_id });;
  // shoe.set({ stock: stock });;
  static async updateStock(product_id, stock) {
    // fetch the shoe from the DB, adjust stock based on amount sold, rewrite shoe to DB w adjusted stock

    try {
      console.log(product_id);

      const update = await Shoe.updateOne(
        {
          _id: product_id,
        },
        {
          $set: { stock: stock },
        }
      );

      if (update.modifiedCount > 0) {
        // updateOne() returns count of number of entries modified, if unsuccessful then modifiedCount would = 0
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductDAO;
