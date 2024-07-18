const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        brand: {
            type: String,
            required: [true, "Please enter shoe brand"],
        },
        size: {
            type: Number,
            required: [true, "Please enter shoe size"],
        },
        name: {
            type: String,
            required: [true, "Please enter a shoe name"],
        },
        colour: {
            type: String,
            required: [true, "Please enter a shoe colour"],
        },
        gender: {
            type: String,
            required: [true, "Please enter a gender"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter shoe quantity"],
        },
        price: {
            type: Number,
            required: [true, "Please enter shoe price"],
        },
        rating: {
            type: Number,
            required: [false, ""],
        },
        category: {
            type: String,
            required: [true, "Please enter shoe category"]
        },
    },
    {collection: "shoes", 
     collation: {locale: 'en', strength: 2}}                // Collation allows for fast, case-insensitive queries
);
module.exports = mongoose.model("Shoe", productSchema);