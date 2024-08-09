const User = require("../models/UserModel");
const Shoe = require("../models/ProductModel");

class AdminDAO {
  static async addShoe(query) {
    try {
      if (await Shoe.create(query)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async removeShoe(product_id) {
    try {
      const removal = await Shoe.deleteOne({ _id: product_id });

      if (removal.deletedCount == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 
   *{
        "stock" : 420,
        "price" : 69.99
    }
   */
  static async updateShoe(product_id, values) {
    try {
      const update = await Shoe.updateOne(
        {
          _id: product_id,
        },
        values
      );

      if (update.modifiedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateUser(email, values) {
    try {
      const update = await User.updateOne(
        {
          email: email,
        },
        values
      );

      if (update.modifiedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.find()
      return users
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

module.exports = AdminDAO;
