const cloudinary = require("cloudinary");
const crypto = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res, next) => {
  try {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: `${crypto.randomBytes(16).toString("hex")}`,
      resource_type: "auto",
    });
    if (!result) {
      return res.status(400).json({
        error: "Image upload failed",
      });
    }
    res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteImages = async (req, res, next) => {
  let image_id = req.body.public_id;
  try {
    await cloudinary.v2.uploader.destroy(image_id);
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
