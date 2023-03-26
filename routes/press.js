const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const pressController = require("../controllers/press");

router.get("/news", pressController.allNews);

router.get("/news/:newsId", pressController.allNews);

router.post("/news", [authCheck, adminCheck], pressController.newNews);

router.put("/news/:newsId", [authCheck, adminCheck], pressController.editNews);

router.delete(
  "/news/:newsId",
  [authCheck, adminCheck],
  pressController.deleteNews
);

module.exports = router;
