import axios from 'axios';
axios.defaults.withCredentials = true

export default class PaymentServices {
    
    static DB = axios.create({ baseURL: 'http://localhost:3001/Payment', withCredentials: true  });

    static async getAllPaymentsForUser(token) {
        try {
             
            const response = await this.DB.post('/GetAllPaymentMethods', {}, {
                headers: {
                    Authorization: token
                }
            });

             
            console.log(response)

            return response
        } catch (err) {
            console.log(err)
        }
    }

    static async addPaymentMethod(token, form) {
        const {card_number, cvc, expiry_date} = form
        try {
            const response = await this.DB.post('/AddPaymentMethod', {card_number, cvc, expiry_date}, {
                headers: {
                    Authorization: token
                }
            })
            return response
        } catch (err) {
            console.log(err)
        }
    }
}