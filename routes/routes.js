const express = require("express");
const router = express.Router();
const validateToken = require("../midlleware/verifyToken");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  number_search,
} = require("../controllers/contactController");
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
router.route("/search/:name").get(number_search);
module.exports = router;
