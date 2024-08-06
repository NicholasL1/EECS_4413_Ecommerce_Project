const AdminDAO = require("../dao/AdminDAO.js");

class AdminService {
  static async addShoe({
    brand,
    size,
    name,
    colour,
    gender,
    stock,
    price,
    rating,
    category,
  }) {
    const shoeFilter = {
      brand: brand,
      size: size,
      name: name,
      colour: colour,
      gender: gender,
      stock: stock,
      price: price,
      rating: rating || 0,
      category: category || null,
    };

    return await AdminDAO.addShoe(shoeFilter);
  }

  static async removeShoe(product_id) {
    return AdminDAO.removeShoe(product_id);
  }

  static async updateShoe(product_id, update) {
    return await AdminDAO.updateShoe(product_id, update);
  }

  static async updateUser(email, update) {
    if (update.password || update.isAdmin || update.cart_id || update.user_id) {
      return false;
    }

    return await AdminDAO.updateUser(email, update);
  }

  static async getAllUsers() {
    return await AdminDAO.getAllUsers()
  }
}

module.exports = AdminService;
