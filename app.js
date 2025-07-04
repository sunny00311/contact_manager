const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const contactRoutes = require("./routes/routes");
const userRoutes = require("./routes/userRoutes");

const errorHandler = require("./midlleware/errorHandler");
const db = require("./config/dbconnect.js");
// Middleware to parse incoming JSON data
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);
app.get("/",(req,res)=>{res.json("working-2 bj3 api")})
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
