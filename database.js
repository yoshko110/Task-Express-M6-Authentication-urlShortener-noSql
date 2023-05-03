const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect('YOUR_CONNECTION_STRING');
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
