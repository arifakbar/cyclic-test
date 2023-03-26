const Press = require("../models/press");

exports.newNews = async (req, res, next) => {
  try {
    const news = new Press(req.body);
    await news.save();
    res.status(201).json({ data: news, message: "News added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.allNews = async (req, res, next) => {
  try {
    const news = await Press.find().sort({ createdAt: -1 });
    res.status(200).json({ data: news, message: "News fetched successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.singleNews = async (req, res, next) => {
  try {
    const news = await Press.findById(req.params.newsId);
    res.status(200).json({ data: news, message: "News fetched successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.editNews = async (req, res, next) => {
  try {
    const news = await Press.findOneAndUpdate(req.params.newsId, req.body, {
      new: true,
    });
    res.status(200).json({ data: news, message: "News updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    await Press.findByIdAndDelete(req.params.newsId);
    res.status(200).json({ ok: true, message: "News updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
