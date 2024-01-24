const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
