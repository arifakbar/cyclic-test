const Contact = require("../models/contact");
const User = require("../models/user");

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const newContact = new Contact({
      name: name,
      email: email,
      subject: subject,
      message: message,
      sentBy: user._id,
    });
    await newContact.save();

    res
      .status(201)
      .json({ data: newContact, message: "Contact created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res
      .status(200)
      .json({ data: contacts, message: "Contacts fetched successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findOneAndDelete(req.params.contactId);
    res.status(200).json({
      ok: true,
      message: "Contact deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
