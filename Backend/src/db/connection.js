const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Connected to DB successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
