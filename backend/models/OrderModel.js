const mongoose = require("mongoose");

const shoeDetailSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please Enter A user_id For This Order"],
      unique: false,
    },
    shoes: {
      type: Map,
      of: shoeDetailSchema,
      required: [true, "At Least 1 Shoe Should Be In The Order"],
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please Enter A Payment For This Order"],
      unique: false,
    },
    total: {
      type: Number,
      required: [true, "Total Cannot Be Empty"],
    },
    date: {
      type: Date,
      required: [true, "Date Cannot Be Empty"],
    },
  },
  { collection: "orders" }
);
module.exports = mongoose.model("Order", orderSchema);
