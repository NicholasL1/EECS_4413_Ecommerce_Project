const express = require("express");
const router = express.Router();

const PaymentService = require("../services/PaymentService.js");
const verifyToken = require("../config/verifyToken.js");

router.post("/AddPaymentMethod", verifyToken, async (req, res) => {
  const { card_number, cvc, expiry_date } = req.body;
  const user_id = req.user.userData[0];

  // Check if all fields are filled
  if (!card_number || !cvc || !expiry_date) {
    res.status(400).json({ message: "Please fill all the fields." });
  }

  try {
    const response = await PaymentService.addPaymentMethod(
      user_id,
      card_number,
      cvc,
      expiry_date
    );
    res.status(201).json({
      message: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

router.post("/UpdatePaymentMethod", verifyToken, async (req, res) => {
  const { card_number, cvc, expiry_date, payment_id } = req.body;

  try {
    const response = await PaymentService.updatePaymentMethod(
      card_number,
      cvc,
      expiry_date,
      payment_id
    );
    res.status(201).json({
      message: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

router.post("/DeletePaymentMethod", verifyToken, async (req, res) => {
  const { payment_id } = req.body;

  try {
    const response = await PaymentService.deletePaymentMethod(payment_id);
    res.status(201).json({
      message: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

router.post("/GetAllPaymentMethods", verifyToken, async (req, res) => {
  const user_id = req.user.userData[0];

  try {
    const payments = await PaymentService.getAllPaymentsForUser(user_id);
    res.status(201).json({
      message: payments,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

router.post("/SelectPaymentMethod", verifyToken, async (req, res) => {
  const { payment_id } = req.body;

  try {
    const payment = await PaymentService.selectPaymentMethod(payment_id);
    res.status(201).json({
      message: payment,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

module.exports = router;
