const mongoose = require("mongoose");

const orangeSellerSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  description: String,
  // image: File,
});

const Seller = new mongoose.model("Sellers", orangeSellerSchema);

module.exports = Seller;
