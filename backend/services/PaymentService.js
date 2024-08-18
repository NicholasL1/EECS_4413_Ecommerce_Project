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
    const payments = await PaymentDAO.getAllPaymentsForUser(user_id);
    return payments;
  }

  static async selectPaymentMethod(payment_id) {
    const payment = await PaymentDAO.selectPaymentMethod(payment_id);
    return payment;
  }

}


return (
  <div>
    <h1>Manage Payments</h1>

    {/* Form to Add or Edit Payment */}
    <div>
      <h2>{form.payment_id ? 'Edit' : 'Add'} Payment</h2>
      <input
        type="text"
        name="card_number"
        placeholder="Card Number"
        value={form.card_number}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="cvc"
        placeholder="CVC"
        value={form.cvc}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="expiry_date"
        placeholder="Expiry Date"
        value={form.expiry_date}
        onChange={handleInputChange}
      />
      {form.payment_id ? (
        <button onClick={updatePayment}>Update Payment</button>
      ) : (
        <button onClick={addPayment}>Add Payment</button>
      )}
    </div>

    {/* List of Payments */}
    <div>
      <h2>Existing Payments</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment._id}>
            {payment.card_number} (Expires: {payment.expiry_date})
            <button onClick={() => editPayment(payment._id)}>Edit</button>
            <button onClick={() => deletePayment(payment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);





module.exports = PaymentService;
