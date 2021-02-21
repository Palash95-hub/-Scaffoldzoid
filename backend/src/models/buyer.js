const mongoose = require("mongoose");

const orangeBuyerSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const Buyer = new mongoose.model("Buyers", orangeBuyerSchema);

module.exports = Buyer;
