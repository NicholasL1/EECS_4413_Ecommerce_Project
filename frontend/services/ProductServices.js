import axios from "axios";
axios.defaults.withCredentials = true
import { api, headers } from "./config";

class ProductServices {
  static DB = axios.create({ baseURL: `${api}/Product/`, withCredentials: true  });

  static async fetchShoes(query) {
    try {
      const response = await this.DB.get("/FetchShoe", {
        params: query,
        // headers: {
        //   ...headers
        // }
      });

      if (response.data.length === 0) return null;

      return response.data;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  static filterDuplicates = (products) => {
    // Used to filter out duplicate results of shoes (only differ by size, colour)
    const uniques = [];
    const dupes = new Set();

    for (const product of products) {
      const key = `${product.brand}-${product.name}-${product.category}-${product.gender}`;

      if (dupes.has(key)) {
      } else {
        dupes.add(key);
        uniques.push(product);
      }
    }

    return uniques;
  };

  static async getAllProducts() {
    try {
      const response = await this.DB.get("fetchAll"
      //   , {
      //   headers: {
      //     ...headers
      //   }
      // }
    );

      if (response.data?.length === 0) {
        return { message: "Fetch returned no products", data: [] };
      }

      const responseU = this.filterDuplicates(response.data);

      return { data: responseU };
    } catch (err) {
      console.error("FetchAll raised an error");
      return { message: "FetchAll operation failed", data: [] };
    }
  }

  static async getProductsFiltered(filter) {
    try {
      const query = {};

      if (filter.brand) {
        query.brand = filter.brand;
      }

      if (filter.category) {
        query.category = filter.category;
      }

      if (filter.colour) {
        query.colour = filter.colour;
      }

      if (filter.gender) {
        query.gender = filter.gender;
      }

      if (filter.name) {
        // used for the search bar query
        query.name = filter.name;
      }

      const response = await this.DB.get("FetchShoe", {
        params: query,
      });

      const responseU = this.filterDuplicates(response.data);

      return { data: responseU };
    } catch (err) {
      console.error(err);
    }
  }

  static async getAlternativeProducts(filter) {
    try {
      const query = {};

      if (filter.brand) {
        query.brand = filter.brand;
      }

      if (filter.category) {
        query.category = filter.category;
      }

      if (filter.colour) {
        query.colour = filter.colour;
      }

      if (filter.gender) {
        query.gender = filter.gender;
      }

      if (filter.name) {
        // used for the search bar query
        query.name = filter.name;
      }

      const response = await this.DB.get("FetchShoe", {
        params: query,
        // headers: {
        //   ...headers
        // }
      });

      return { data: response.data };
    } catch (err) {
      console.error(err);
    }
  }

  static async getShoeInfo(id) {
    try {
      const response = await this.DB.get(`FetchShoeById/?product_id=${id}`, {
        // headers: {
        //   ...headers
        // }
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        message: err,
      };
    }
  }
}

export default ProductServices;
