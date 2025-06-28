const db = require("../config/dbconnect");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields (username, email, password) are required");
  }

  //   const userExists = await db.query('INSERT INTO users (name, email, password)
  // VALUES ('John Doe', 'john@example.com', 'yourPassword123'));
  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const sql =
      "INSERT INTO users (name, email, password) VALUES (name, email, passworf)";

    db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("User inserted successfully");
    });
  } catch (err) {
    console.error("DB Error:", err.sqlMessage);
  }
});

// res.json({ message: "Register the user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields ( email, password) are required");
  }
  const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  // console.log("user", user[0][0].password);

  console.log("user :>> ", user);
  if (user.length > 0 && password === user[0][0].password) {
    console.log("login working");
    const accessToken = jwt.sign(
      {
        user: {
          username: user[0][0].name,
          email: user[0][0].email,
          id: user[0][0].id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "4h" }
    );

    return res.status(200).json({ accessToken });
    res.json({ message: "login user" });
  } else {
    res.status(401);
    throw new Error("id or pass wrong");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  const { id, email, username } = req.user;

  res.json({ email, username, id });
});

module.exports = { registerUser, loginUser, currentUser };
