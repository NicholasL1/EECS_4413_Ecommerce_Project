import PaymentServices from "./paymentServices";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.withCredentials = true

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

  static async updateUser(token, update) {
    try {
      const response = await this.DB.post('/User/UpdateUser', 
        {
          update: update,
        },
        {
          headers: {
              Authorization: token
          }
        }
      );

      return response

    } catch (err) {
      console.log(err.message)
      return err.message
    }
  }

  static async Logout() {
    try {
      await this.DB.post('/User/Logout')
      sessionStorage.removeItem('Authorization')
      console.log('Logged out')
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  static async getUser (token) {
    // debugger
    const decodedToken = jwtDecode(token)
    const user = decodedToken.userData
    
    const response = await PaymentServices.getAllPaymentsForUser(token)
    console.log(response)

    return {payment_info: response.data.message, email: user[2], first_name: user[4], last_name: user[5], address: user[6]}
  }

  static async getUserSession() {
    const response = await this.DB.get('/User/UserSession')
    console.log(response)
    return response
  }
}
