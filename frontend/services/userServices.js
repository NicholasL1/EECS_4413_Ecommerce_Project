import PaymentServices from "./paymentServices";
import axios from "axios";
import { api, headers } from "./config";
import { jwtDecode } from "jwt-decode";
axios.defaults.withCredentials = true
import Cookies from "js-cookie";
import { getToken } from "@/lib/utils";

export default class UserService {
  static DB = axios.create({ baseURL: `${api}`, withCredentials: true });

  static getUserId() {
    const tokenJSON = getToken()
    // const tokenJSON = sessionStorage.getItem("Authorization");
    if (tokenJSON == "undefined") {
      console.error('no auth');
      return null;
    }
    try {
      const decoded = jwtDecode(tokenJSON);
      const user_id = decoded.userData[0];
      console.log("Decoded user ID:", user_id);
      return user_id;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  }

  static async UpdateUser(updateData) {
    const userId = this.getUserId();
    if (!userId) {
      return { success: false, message: "No user ID" };
    }
    try {
      const response = await this.DB.patch(
        "/User/update",
        {
          userId,
          update: updateData,
        },
        {
          headers: {
            ...headers,
          },
        }
      );
      // debugging
      console.log("Update response:", response.data);
      return {
        success: true,
        message: response.data.message,
        updatedFields: response.data.updatedFields,
        user: response.data.user,
      };
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Error updating user",
      };
    }
  }

  static async GetUserById() {
    const userId = this.getUserId();
    if (!userId) {
      return { success: false, message: "No user ID available" };
    }
    try {
      const response = await this.DB.get(`/User/Account/${userId}`, {
        headers: {
          ...headers,
        },
      });
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error fetching user data:", err);
      return { success: false, message: "Error fetching user data" };
    }
  }

  static async GetUserOrders(token) {
    try {
      const response = await this.DB.get("/Order/UserOrderHistory", {
        headers: {
          Authorization: token,
          ...headers
        }
      });

      if (response.data && Array.isArray(response.data)) {
        return {
          message: response.data.length,
          data: response.data,
        };
      } else {
        return { message: "Unexpected response format from server", data: [] };
      }
    } catch (err) {
      console.error("Error in GetUserOrders:", err);
    }
  }

  static async GetShoeById(shoeId) {
    try {
      const response = await this.DB.get("/Product/FetchShoeById", {
        params: { product_id: shoeId },
        headers: {
          ...headers,
        },
      });
      return {
        message: "",
        data: response.data,
      };
    } catch (err) {
      console.error(err);
      return {
        message: "Product ID does not exist.",
      };
    }
  }

  static async Login(email, password) {
    try {
      const response = await this.DB.post(
        "/User/Login",
        { email, password },
        {
          headers: {
            ...headers,
          },
        }
      );
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
      const response = await this.DB.post(
        "/User/Register",
        {
          email,
          password,
          first_name,
          last_name,
          address,
        },
        {
          headers: {
            ...headers,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return {
        message: err.response.data.message,
      };
    }
  }

  static async Logout() {
    try {
      await this.DB.post('/User/Logout')
      // sessionStorage.removeItem('Authorization')
      Cookies.remove('Authorization')
      console.log('Logged out')
      window.location.href = '/'
    } catch (err) {
      console.log(err);
    }
  }

  static async getUser(token) {
    const decodedToken = jwtDecode(token);
    const user = decodedToken.userData;
    const response = await PaymentServices.getAllPaymentsForUser(token);
    console.log(response);
    return {
      payment_info: response.data.message,
      email: user[2],
      first_name: user[4],
      last_name: user[5],
      address: user[6],
    };
  }
}
