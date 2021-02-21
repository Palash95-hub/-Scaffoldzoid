const mongoose = require("mongoose");

const orangeTypeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  creationTime: Date,
  userId: mongoose.Schema.Types.ObjectId,
});

const Orange = new mongoose.model("Oranges", orangeTypeSchema);

module.exports = Orange;
