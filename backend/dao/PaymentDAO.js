const PaymentModel = require("../models/PaymentModel");

class PaymentDAO {
  static async addPaymentMethod(user_id, card_number, cvc, expiry_date) {
    const payment = await PaymentModel.create({
      user_id,
      card_number,
      cvc,
      expiry_date,
    });
    if (payment) {
      return payment;
    } else {
      return null;
    }
  }

  static async updatePaymentMethod(card_number, cvc, expiry_date, payment_id) {
    try {
      const payment = await PaymentModel.findOne({ _id: payment_id });

      if (!payment) {
        return "Could not find the payment method";
      }

      payment.set("card_number", card_number);
      payment.set("cvc", cvc);
      payment.set("expiry_date", expiry_date);
      await payment.save();
      return "Payment method updated";
    } catch (err) {
      return "Error updating";
    }
  }

  static async deletePaymentMethod(payment_id) {
    try {
      await PaymentModel.deleteOne({ _id: payment_id });
      return "Payment method deleted.";
    } catch (error) {
      return "Error deleting payment method.";
    }
  }

  static async getAllPaymentsForUser(user_id) {
    const payments = await PaymentModel.find({ user_id: user_id });

    // Return empty array, not error
    if (!payments) {
      return [];
    }

    return payments;
  }

  static async selectPaymentMethod(payment_id) {
    const payment = await PaymentModel.findOne({ _id: payment_id });
    if (payment) {
      return payment;
    }
    return "Could not find the payment method";
  }
}

module.exports = PaymentDAO;
