const productModel = require("../Models/product.model");

exports.createProduct = (req, res) => {
  const { name, category, new_price, old_price } = req.body;

  // التحقق من أن الصورة تم تحميلها
  if (!req.file) {
    return res.status(400).json({ message: "Image not uploaded!" });
  }

  // إنشاء رابط الصورة
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  // نموذج المنتج الجديد
  const newProduct = new productModel({
    id: Date.now(), // أو يمكنك إضافة id يدويا كما ترغب
    name,
    category,
    image: imageUrl,
    new_price,
    old_price,
  });

  // حفظ المنتج في قاعدة البيانات
  newProduct
    .save()
    .then((product) => {
      // إرجاع المنتج الذي تم إنشاؤه
      res.status(201).json({
        message: "Product created successfully!",
        product,
      });
    })
    .catch((err) => {
      // في حالة حدوث خطأ في عملية الحفظ
      res.status(400).json({ error: err.message });
    });
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id; // الحصول على الـ id من الـ params في الـ URL
  try {
    const product = await productModel.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, category, new_price, old_price } = req.body;
  const productId = req.params.id; // الحصول على الـ id من الـ params في الـ URL

  try {
    // التحقق من أن الصورة تم تحميلها
    let imageUrl = "";
    if (req.file) {
      // إنشاء رابط الصورة
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    // العثور على المنتج وتحديثه
    const updatedProduct = await productModel.findOneAndUpdate(
      { id: productId },
      { name, category, new_price, old_price, image: imageUrl },
      { new: true } // لضمان إرجاع المنتج المحدّث
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id; // الحصول على الـ id من الـ params في الـ URL

  try {
    const deletedProduct = await productModel.findOneAndDelete({
      id: productId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully!",
      product: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

