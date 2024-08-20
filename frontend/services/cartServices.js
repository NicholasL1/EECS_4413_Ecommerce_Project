import axios from "axios";

export default class CartService {
    static DB = axios.create({baseURL: 'http://localhost:3001/Cart'})

    static async getCart() {
        try {
            const response = await this.DB.get('/GetCart')
            const cart = response.data
            const items = []

            if (Object.keys(cart).length === 0)
                return items

            let total = 0

            for (const [key, value] of Object.entries(cart)) {
                
                total += value.qty * value.price
                items.push({...value})
            }

            const gst = total * .13
            const estTotal = total * 1.13
            return {total, gst, estTotal, items}
        } catch (err) {
            console.log(err)
            return []
        }
    } 

    /**
     * 
     * @param {number} id 
     */
    static async removeFromCart(shoe_id) {
        try {
            const response = await this.DB.post('/RemoveFromCart', {shoe_id})
            return response            
        } catch (err) {
            return {message: err.message, data: []}
        }
    }

    /**
     * 
     * @param {number} amt 
     * @param {string} id 
     */
    static async updateQuantity(qty, shoe_id) {
        try {
            const response = await this.DB.post('/UpdateQuantity', {qty, shoe_id})
            return response
        } catch (err) {
            return {message: err.message, data: []}
        }
    }

    static async clearCart() {
        try {
            const response = await this.DB.post('/ClearCart')
            return response
        } catch (err) {

        }
    }

    static async checkout(token, payment_id) {
        try {
            const response = await this.DB.post('/Checkout', {
                payment_id
            }, {
                headers: {
                    Authorization: token
                }
            })

            console.log(response)

        } catch (err) {
            console.log(err.message)
        }
    }
} 