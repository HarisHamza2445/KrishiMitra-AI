const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["farmer", "admin"],
    default: "farmer"
  },
  location: String,
  soilType: String,
  farmSize: Number
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
