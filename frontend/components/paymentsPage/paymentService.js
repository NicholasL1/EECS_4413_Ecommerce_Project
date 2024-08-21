import axios from 'axios';

export default class PaymentService {
    static DB = axios.create({ baseURL: 'http://localhost:3001/' });

    static getAuthHeaders() {
        const token = localStorage.getItem("Authorization");

        return {
            headers: {
                Authorization: token,
            },
        };
    }

    static async UpdatePaymentMethod(payment) {
        try {
            const headers = this.getAuthHeaders();
            const response = await this.DB.post('/Payment/UpdatePaymentMethod', payment, headers);
            return { success: true, message: response.data.message };
        } catch (err) {
            console.error('Error updating payment method:', err);
            return { success: false, message: 'Failed to update payment method' };
        }
    }





    static async GetAllPayments() {
        try {
            const response = await this.DB.post('/Payment/GetAllPaymentMethods', {}, this.getAuthHeaders());
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
            const response = await this.DB.post('/Payment/AddPaymentMethod', payment, this.getAuthHeaders());
            console.log("AddPayment raw response:", response);
            if (response.data.message === "Payment method added.") {
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.message || "Failed to add payment method" };
            }
        } catch (err) {
            console.error('Error adding payment method:', err);
            return { success: false, message: 'Failed to add payment method' };
        }
    }

    static async DeletePayment(paymentId) {
        try {
            const response = await this.DB.post('/Payment/DeletePaymentMethod', { payment_id: paymentId }, this.getAuthHeaders());
            return { success: true, message: response.data.message };
        } catch (err) {
            console.error('Error deleting payment:', err);
            return { success: false, message: response.data.message || "Failed to delete payment method" };

        }
    }

    static async SelectPaymentMethod(paymentId) {
        try {
            const response = await this.DB.post('/Payment/SelectPaymentMethod', { payment_id: paymentId }, this.getAuthHeaders());
            return { success: true, data: response.data.message };

        } catch (err) {
            console.error('Error trying to select payment method:', err);
            return { success: false, message: response.data.message || "Failed to select payment method" };
        }
    }
}
