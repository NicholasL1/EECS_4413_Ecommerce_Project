const mongoose = require("mongoose");

// Function to connect to mongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
