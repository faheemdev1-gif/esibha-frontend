const Product = require("../models/Product");

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const {
      category,
      family,
      search,
      featured,
      bestseller,
      inStock,
      intensity,
      sort = "default",
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (family) query.family = family;
    if (featured !== undefined) query.featured = featured === "true";
    if (bestseller !== undefined) query.bestseller = bestseller === "true";
    if (inStock !== undefined) query.inStock = inStock === "true";

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { inspo: { $regex: search, $options: "i" } },
        { family: { $regex: search, $options: "i" } },
      ];
    }

    if (intensity) {
      const intensityMap = {
        Light: [0, 40],
        Moderate: [40, 65],
        Strong: [65, 82],
        "Very Strong": [82, 101],
      };

      const range = intensityMap[intensity];
      if (range) query.intensity = { $gte: range[0], $lt: range[1] };
    }

    let productsQuery = Product.find(query);

    switch (sort) {
      case "price-asc":
        productsQuery = productsQuery.sort({ "sizes.0.price": 1 });
        break;
      case "price-desc":
        productsQuery = productsQuery.sort({ "sizes.0.price": -1 });
        break;
      case "new":
        productsQuery = productsQuery.sort({ createdAt: -1 });
        break;
      default:
        productsQuery = productsQuery.sort({ bestseller: -1, createdAt: -1 });
    }

    const products = await productsQuery;

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// GET /api/products/slug/:slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PATCH /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};