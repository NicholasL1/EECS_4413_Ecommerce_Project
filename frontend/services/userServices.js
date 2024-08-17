import axios from "axios";

export default class userServices {
  static DB = axios.create({ baseURL: "http://localhost:3001/" });

  static async Login(email, password) {
    try {
      const response = await this.DB.post("/User/Login", { email, password });
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        message: err,
      };
    }
  }

  static async Register(email, password, first_name, last_name, address) {
    try {
      const response = await this.DB.post("/User/Register", {
        email,
        password,
        first_name,
        last_name,
        address,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return {
        message: err.response.data.message,
      };
    }
  }
}
