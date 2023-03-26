const Category = require("../models/category");
const Product = require("../models/product");

const slugify = require("slugify");

exports.getCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const cat = await Category.findOne({ slug: slug });
    const products = await Product.find({ category: cat }).populate("category");
    if (!cat) {
      return res.status(404).json({ message: "Category not found!" });
    }
    return res.status(200).json({
      data: cat,
      products: products,
      message: "Category fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const cat = await Category.find().sort({ createdAt: "-1" });
    return res.status(200).json({
      data: cat,
      message: "All categories fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCat = new Category({ name: name, slug: slugify(name) });
    await newCat.save();
    return res
      .status(201)
      .json({ data: newCat, message: "Category created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.updateCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const { name } = req.body;
    const updatedCat = await Category.findOneAndUpdate(
      { slug: slug },
      { name: name, slug: slugify(name) },
      {
        new: true,
      }
    );
    return res.status(201).json({
      data: updatedCat,
      message: "Category updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    await Category.findOneAndDelete({ slug: slug });
    res.status(201).json({
      ok: true,
      mesage: "Category deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
