const mongoose = require("mongoose");
const dealerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  companyName: {
    type: String,
    required: [true, "Company Name is Required"],
  },
  licenseNumber: {
    type: String,
    required: [true, "License Number is Required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is Required"],
  },
});
const Dealer = mongoose.model("Dealer", dealerSchema);
module.exports = Dealer;
