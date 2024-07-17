const mongoose = require("mongoose");

const shoeSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Enter a Brand"],
      unique: true,
    },
    size: {
      type: Number,
      required: [true, "Enter a Size"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Enter Shoe's Name"],
      unique: true,
    },
    colour: {
      type: String,
      required: [true, "Enter Shoe's Colour"],
      unique: true,
    },
    gender: {
      type: String,
      required: [true, "Enter a Gender"],
      unique: true,
    },
    stock: {
      type: Number,
      required: [true, "Enter a quantity of shoes"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Enter a price"],
      unique: true,
    },
    rating: {
      type: String,
      required: [true, "Enter a rating between 1-5"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Enter a category"],
      unique: true,
    },
  },
  { collection: "shoes" }
);
module.exports = mongoose.model("Shoe", shoeSchema);
