const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    first_name: {
      type: String,
      required: [true, "Please enter a first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter a last name"],
    },
    address: {
      type: String,
      required: [true, "Please enter an address"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "users" }
);
module.exports = mongoose.model("User", userSchema);
