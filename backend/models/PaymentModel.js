const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please have a valid user for this payment option."],
      unique: false,
    },
    card_number: {
      type: String,
      required: [true, "Please enter a valid card number."],
      unique: false,
    },
    cvc: {
      type: String,
      required: [true, "Please enter a valid CVC."],
      unique: false,
    },
    expiry_date: {
      type: String,
      required: [true, "Please enter a valid expiry date."],
      unique: false,
    },
  },
  { collection: "payments" }
);

module.exports = mongoose.model("Payment", paymentSchema);
