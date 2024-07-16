const mongoose = require("mongoose");

const shoeDetailSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const shoeSchema = mongoose.Schema({
  shoes: {
    type: Map,
    of: shoeDetailSchema,
    required: [true, "Please add shoe"],
  },
});

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please Enter A user_id For This Order"],
      unique: true,
    },
    shoes: {
      type: shoeSchema,
      required: [true, "At Least 1 Shoe Should Be In The Order"],
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
