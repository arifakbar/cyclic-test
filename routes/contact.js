const express = require("express");

const router = express.Router();
const contactController = require("../controllers/contact");
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/contact", [authCheck], contactController.createContact);

router.get("/contacts", [authCheck, adminCheck], contactController.getContacts);

router.delete(
  "/contact/:contactId",
  [authCheck, adminCheck],
  contactController.deleteContact
);

module.exports = router;
