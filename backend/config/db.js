const mongoose = require("mongoose");

// Function to connect to mongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
