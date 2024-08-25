import { getToken } from '@/lib/utils';
import axios from 'axios';

export default class PaymentService {
    static DB = axios.create({ baseURL: 'http://localhost:3001/' });

    static getAuthHeaders() {
        debugger
        const tokenJSON = getToken()
        let token = '';
        if (tokenJSON != "undefined") {
            try {
                const tokenObject = JSON.parse(tokenJSON);
                token = tokenObject.token || tokenObject;
            } catch (e) {
                console.error('Error parsing token:', e);
            }
        }
        console.log("Token being used:", token);
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    static async UpdatePaymentMethod(payment) {
        try {
            const headers = this.getAuthHeaders();
            const response = await this.DB.post('/Payment/UpdatePaymentMethod', payment, {
                headers: {
                    Authorization: getToken()
                }
            });
            return { success: true, message: response.data.message };
        } catch (err) {
            console.error('Error updating payment method:', err);
            return { success: false, message: 'Failed to update payment method' };
        }
    }

    static async GetAllPayments() {
        try {
            const response = await this.DB.post('/Payment/GetAllPaymentMethods', {}, {
                headers: {
                    Authorization: getToken()
                }
            });
            if (Array.isArray(response.data.message)) {
                return { success: true, data: response.data.message };
            } else {
                console.error("Unexpected response structure:", response);
                return { success: false, data: [], message: "Unexpected response structure" };
            }
        } catch (err) {
            console.error('Error fetching payment methods:', err);
            return { success: false, data: [], message: 'Failed to fetch payment methods' };
        }
    }

    static async AddPayment(payment) {
        try {
            const headers = this.getAuthHeaders();
            const response = await this.DB.post('/Payment/AddPaymentMethod', payment, {
                headers: {
                    Authorization: getToken()
                }
            });
            return { success: true, message: response.data.message };
        } catch (err) {
            if (err.response && err.response.status === 403) {
                console.log('Full error object:', err);
                return { success: false, message: 'Access forbidden. Please check your login status.' };
            }
            return { success: false, message: err.response ? err.response.data.message : 'Failed to add payment method' };
        }
    }
    static async DeletePayment(paymentId) {
        try {
            const response = await this.DB.post('/Payment/DeletePaymentMethod', { payment_id: paymentId }, {
                headers: {
                    Authorization: getToken()
                }
            });
            return { success: true, message: response.data.message };
        } catch (err) {
            console.error('Error deleting payment:', err);
            return { success: false, message: response.data.message || "Failed to delete payment method" };

        }
    }

    static async SelectPaymentMethod(paymentId) {
        try {
            const response = await this.DB.post('/Payment/SelectPaymentMethod', { payment_id: paymentId }, {
                headers: {
                    Authorization: getToken()
                }
            });
            return { success: true, data: response.data.message };

        } catch (err) {
            console.error('Error trying to select payment method:', err);
            return { success: false, message: response.data.message || "Failed to select payment method" };
        }
    }
}
