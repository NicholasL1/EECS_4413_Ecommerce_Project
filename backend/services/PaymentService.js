const PaymentDAO = require("../dao/PaymentDAO");

class PaymentService {
  static async addPaymentMethod(user_id, card_number, cvc, expiry_date) {
    const response = await PaymentDAO.addPaymentMethod(
      user_id,
      card_number,
      cvc,
      expiry_date
    );
    return response;
  }

  static async updatePaymentMethod(card_number, cvc, expiry_date, payment_id) {
    const response = await PaymentDAO.updatePaymentMethod(
      card_number,
      cvc,
      expiry_date,
      payment_id
    );
    return response;
  }

  static async deletePaymentMethod(payment_id) {
    const response = await PaymentDAO.deletePaymentMethod(payment_id);
    return response;
  }

  static async getAllPaymentsForUser(user_id) {
    console.log("User ID:", user_id); // Log the user ID
    const payments = await PaymentDAO.getAllPaymentsForUser(user_id);
    console.log("Payments Found:", payments); // Log the payments found
    return payments;
  }
  

  static async selectPaymentMethod(payment_id) {
    const payment = await PaymentDAO.selectPaymentMethod(payment_id);
    return payment;
  }

}



module.exports = PaymentService;
