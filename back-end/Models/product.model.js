const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  image: String,
  new_price: Number,
  old_price: Number,
});

module.exports = mongoose.model("products", productSchema);
