const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const cloudinaryController = require("../controllers/cloudinary");

router.post(
  "/uploadImages",
  [authCheck, adminCheck],
  cloudinaryController.uploadImages
);

router.post(
  "/deleteImages",
  [authCheck, adminCheck],
  cloudinaryController.deleteImages
);

module.exports = router;
