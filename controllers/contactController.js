// @desc Get all contacts
// @route GET /api/contacts
// @access public
// const asynchandler = require("express-async-handler");
const db = require("../config/dbconnect");

const asyncHandler = require("express-async-handler");

// const getUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   res.status(200).json(user);
// });

const getContacts = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM contacts");

  res.status(200).json(rows);
});

// @route POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // Check if any field is missing
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields (name, email, phone) are required");
  }
  // const user_id = 12;

  const user_id = req.user.id;
  // Insert data into MySQL
  const [result] = await db.query(
    "INSERT INTO contacts (name, email, phone,user_id) VALUES (?, ?, ?,?)",
    [name, email, phone, user_id]
  );

  // Return created contact with its insertId
  res.status(201).json({
    id: result.insertId,
    name,
    email,
    phone,
    message: "Contact created successfully",
  });
});

// @desc Get contact by ID
// @route GET /api/contacts/:id
// @access public
// const getContact = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `Get contact for ${req.params.id}` });
// });
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM contacts WHERE id = ?", [id]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(rows[0]);
});

// @desc Update contact
// @route PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("req.params :>> ", req.params);
  const { name, email, phone } = req.body;
  console.log(req.user);
  // const id = req.user.id;
  // Check if contact exists
  const [existing] = await db.query("SELECT * FROM contacts WHERE id = ?", [
    id,
  ]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Update contact
  const [result] = await db.query(
    "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id]
  );

  res.status(200).json({ message: "Contact updated successfully" });
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("req.params :>> ", req.params);
  // Check if contact exists
  const [existing] = await db.query("SELECT * FROM contacts WHERE id = ?", [
    id,
  ]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Delete contact
  await db.query("DELETE FROM contacts WHERE id = ?", [id]);

  res.status(200).json({ message: "Contact deleted successfully" });
});

const number_search = asyncHandler(async (req, res) => {
  const { name } = req.params;
  // Check if contact exists
  const [existing] = await db.query("SELECT * FROM contacts WHERE name = ?", [
    name,
  ]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }
  console.log("[existing] :>> ");

  // Delete contact
  // await db.query("DELETE FROM contacts WHERE id = ?", [id]);

  res.status(200).json([existing][0][0]);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  number_search,
};
