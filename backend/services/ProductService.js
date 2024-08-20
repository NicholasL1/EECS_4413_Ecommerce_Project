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

    if (query.rating) {
      filteredQuery.rating = Number(query.rating);
    }

    if (query.category) {
      filteredQuery.category = query.category;
    }

    if (query.price === "Deals") {
      filteredQuery.dealPrice = { $exists: true, $type: "number" };
    }

    const results = await ProductDAO.fetchShoes(filteredQuery);

    if (query.price === "Low to High") {
      return results.sort((a, b) => a.price - b.price);
    } else if (query.price === "High to Low") {
      return results.sort((a, b) => b.price - a.price);
    }

    return results;
  }

  static async fetchShoeById(product_id) {
    return await ProductDAO.fetchShoeById(product_id);
  }

  static async fetchAllShoes() {
    return await ProductDAO.fetchAll();
  }

  static async updateStock({ product_id, stock }) {
    return await ProductDAO.updateStock(product_id, stock);
  }
}

module.exports = ProductService;
