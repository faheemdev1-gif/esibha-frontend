const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);

router.get("/slug/:slug", getProductBySlug);

router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;