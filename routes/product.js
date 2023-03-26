const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const productController = require("../controllers/product");

router.post("/products", productController.getAllProducts);

router.get("/product/:productId", productController.getProduct);

router.get("/products/total", productController.productsCount);

router.get("/products/:count", productController.getProductsByCount);

router.post(
  "/product",
  [authCheck, adminCheck],
  productController.createProduct
);

router.put(
  "/product/:productId",
  [authCheck, adminCheck],
  productController.updateProduct
);

router.delete(
  "/product/:productId",
  [authCheck, adminCheck],
  productController.deleteProduct
);

router.post("/products/search", productController.searchProduct);

router.get("/product/related/:productId", productController.relatedProducts);

router.post(
  "/product/star/:productId",
  [authCheck],
  productController.productRating
);

router.post("/filter/products", productController.filterProducts);

router.post("/most-rated", productController.mostRated);

module.exports = router;
