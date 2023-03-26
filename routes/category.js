const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const categoryController = require("../controllers/category");

router.get("/categories", categoryController.getAllCategories);
router.get("/category/:slug", categoryController.getCategory);
router.post(
  "/category",
  [authCheck, adminCheck],
  categoryController.addCategory
);
router.put(
  "/category/:slug",
  [authCheck, adminCheck],
  categoryController.updateCategory
);
router.delete(
  "/category/:slug",
  [authCheck, adminCheck],
  categoryController.deleteCategory
);

module.exports = router;
