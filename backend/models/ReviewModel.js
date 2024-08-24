const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please Enter A User Id for this Review"],
    unique: false,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please Enter A Product Id for this Review"],
  },
  rating: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please Enter A Name for this Review"],
  },
  title: {
    type: String,
    required: [true, "Please Enter A Title for this Review"],
  },
  comment: {
    type: String,
    required: [true, "Please Leave a Comment for this Review"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
