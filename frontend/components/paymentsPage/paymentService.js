import axios from 'axios'

export default class PaymentService {
    static DB = axios.create({ baseURL: 'http://localhost:3001/' })

    static async AddPayment(payment) {
        try {
            const response = await this.DB.get('/Payment/AddPaymentMethod', payment);
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error adding  methods:', err);
            return { message: 'Failed to add  payment methods', data: [] };
        }
    }

    static async UpdatePayment(payment) {
        try {
            const response = await this.DB.get('/Payment/UpdatePaymentMethod', payment);
            return { message: '', data: response.data };

        } catch (err) {
            console.error('Error updating payment', err);
        }
    }

    static async GetAllPayments() {
        try {
            const response = await this.DB.get('/Payment/GetAllPaymentMethods');
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error fetching payment methods:', err);
            return { message: 'Failed to fetch payment methods', data: [] };
        }
    }

    static async DeletePayment(paymentId) {
        try {
            const response = await this.DB.get('/Payment/DeletePaymentMethod', { payment_id: paymentId })
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error deleting payment', err)
            return { message: 'Error deleting payment method', data: [] };
        }
    }

    static async SelectedPaymentMethod(paymentId) {
        try {
            const response = await this.DB.get('/Payment/SelectPaymentMethod', { payment_id: paymentId })
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error trying to select payment', err)
        }
    }
}