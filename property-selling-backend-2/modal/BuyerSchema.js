const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
});

const Buyer = mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
