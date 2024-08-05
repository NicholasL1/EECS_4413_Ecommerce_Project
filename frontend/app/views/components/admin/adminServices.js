import axios from 'axios';

export default class AdminServices {
    static DB = axios.create({ baseURL: 'http://localhost:3001/Order/' });

    static async GetAllOrders(token) {
        try {
            const response = await this.DB.get('/GetAllOrders', {
                headers: {
                    Authorization: token
                }
            });
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error fetching Orders:', err);
            return { message: 'No Data to Display, check logs', data: [] };
        }
    }
}
