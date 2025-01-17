const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  image: String,
  new_price: Number,
  old_price: Number,
  isDeleted: { type: Boolean, default: false }, // خاصية لتحديد ما إذا كان المنتج محذوفاً أم لا
});

module.exports = mongoose.model("products", productSchema);
