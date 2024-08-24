import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default class UserService {
  static DB = axios.create({ baseURL: "http://localhost:3001/" });

  static getUserId() {
    const tokenJSON = localStorage.getItem("Authorization");
    if (!tokenJSON) {
      console.error('no auth');
      return null;
    }
    try {
      const decoded = jwtDecode(tokenJSON);
      const user_id = decoded.userData[0];
      console.log('Decoded user ID:', user_id);
      return user_id;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  static async GetUserById() {
    const userId = this.getUserId();
    if (!userId) {
      return { success: false, message: 'No user ID available' };
    }
    try {
      const response = await this.DB.get(`/User/Account/${userId}`);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error fetching user data:', err);
      return { success: false, message: 'Error fetching user data' };
    }
  }

  static async GetUserOrders(token) {
    try {
      const response = await this.DB.get('/Order/UserOrderHistory', {
        headers: {
          Authorization: token
        }
      });

      if (response.data && Array.isArray(response.data)) {
        return {
          message: response.data.length,
          data: response.data
        };
      } else {
        return { message: 'Unexpected response format from server', data: [] };
      }
    } catch (err) {
      console.error('Error in GetUserOrders:', err);
    }
  }

  static async GetShoeById(shoeId) {
    try {
      const response = await this.DB.get('/Product/FetchShoeById', {
        params: { product_id: shoeId }
      });
      return {
        message: '', data: response.data
      };

    } catch (err) {
      console.error(err);
      return {
        message: "Product ID does not exist."
      }
    }
  }

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

  static async UpdateUser(updateData) {
    const userId = this.getUserId();
    if (!userId) {
      return { success: false, message: 'No user ID' };
    }
    try {
      const response = await this.DB.patch('/User/update',
        { userId, update: updateData }
      );
      // debugging 
      console.log('Update response:', response.data);
      return {
        success: true,
        message: response.data.message,
        updatedFields: response.data.updatedFields,
        user: response.data.user
      };
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Error updating user'
      };
    }
  }
}