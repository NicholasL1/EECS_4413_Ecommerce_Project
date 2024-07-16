const mongoose = require("mongoose");

const shoeDetailSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = mongoose.Schema(
  {
    shoes: {
      type: map,
      of: shoeDetailSchema,
      required: [true, "Please add shoes"],
    },
  },
  { collection: "carts" }
);

module.exports = mongoose.model("Cart", cartSchema);
