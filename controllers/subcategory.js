const SubCategory = require("../models/subcategory");
const Product = require("../models/product");

const slugify = require("slugify");

exports.getAllSubCategories = async (req, res, next) => {
  try {
    const subs = await SubCategory.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: subs,
      message: "Sub categories fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured",
    });
  }
};

exports.getSubCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const sub = await SubCategory.findOne({ slug: slug });
    const products = await Product.find({ subCategory: sub }).populate(
      "subCategory"
    );
    res.status(200).json({
      data: sub,
      products: products,
      message: "Sub-category fetched successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.addSubCategory = async (req, res, next) => {
  const { name, parent } = req.body;
  try {
    const newSub = new SubCategory({
      name: name,
      slug: slugify(name),
      parent: parent,
    });
    await newSub.save();
    res.status(201).json({
      data: newSub,
      message: "Sub-category created successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.updateSubCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const { name, parent } = req.body;
    const updatedSub = await SubCategory.findOneAndUpdate(
      { slug: slug },
      { name: name, slug: slugify(name), parent: parent }
    );
    res.status(201).json({
      data: updatedSub,
      message: "Sub-category updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    await SubCategory.findOneAndDelete({ slug: slug });
    res.status(201).json({
      ok: true,
      message: "Sub-category deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.getSubCategoryByParent = async (req, res, next) => {
  const { id } = req.params;
  console.log("P " + id);
  try {
    const subs = await SubCategory.find({ parent: id });
    res.status(200).json({
      data: subs,
      message: "Sub-Category by parent fetched successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
