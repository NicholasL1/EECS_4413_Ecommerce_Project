const ProductDAO = require("../dao/ProductDAO.js");

class ProductService {
  static async fetchShoes(query) {
    // Filtering out parameters that don't contain any values before passing the query to the DAO

    /** Instead of doing this, we can use a template string */

    const filteredQuery = {};

    if (query.brand) {
      filteredQuery.brand = query.brand;
    }

    if (query.size) {
      filteredQuery.size = Number(query.size);
    }

    if (query.name) {
      filteredQuery.name = query.name;
    }

    if (query.colour) {
      filteredQuery.colour = query.colour;
    }

    if (query.gender) {
      filteredQuery.gender = query.gender;
    }

    if (query.price) {
      filteredQuery.price = Number(query.price);
    }

    if (query.rating) {
      filteredQuery.rating = Number(query.rating);
    }

    if (query.category) {
      filteredQuery.category = query.category;
    }

    return await ProductDAO.fetchShoes(filteredQuery);
  }

  static async fetchAllShoes() {
    return await ProductDAO.fetchAll();
  }

  static async updateStock({ product_id, stock }) {
    return await ProductDAO.updateStock(product_id, stock);
  }
}

module.exports = ProductService;
