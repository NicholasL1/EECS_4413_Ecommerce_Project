import axios from 'axios';
export default class PaymentServices {
    
    static DB = axios.create({ baseURL: 'http://localhost:3001/' });

    static async getAllPaymentsForUser(token) {
        try {
            // debugger
            const response = await this.DB.post('/Payment/GetAllPaymentMethods', {
                headers: {
                    Authorization: token
                }
            });
            return response.message
        } catch (err) {
            console.log(err)
        }
    }
}