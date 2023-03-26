const admin = require("../firebase/index");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "Invalid or expired token!",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email: email });
    if (adminUser.role !== "admin") {
      res.status(403).json({
        error: "Admin resource. Access denied!",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: "User not found",
    });
  }
};
