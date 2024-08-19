import axios from "axios";

export default class shoeService {
  static DB = axios.create({ baseURL: "http://localhost:3001/Product/" });

  static async GetShoeInfo(id) {
    try {
      const response = await this.DB.get(`FetchShoeById/?product_id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        message: err,
      };
    }
  }
}
