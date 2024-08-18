import axios from "axios";

export default class CartService {
    static DB = axios.create({baseURL: 'http://localhost:3001/Cart'})

    static async getCart() {
        try {
            const response = await this.DB.get('/GetCart', {
                withCredentials: true
              })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    } 
} 