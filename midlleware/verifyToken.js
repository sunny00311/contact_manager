const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("User is not authorized");
      }

      req.user = decoded.user;

      if (!token) {
        res.status(401);
        throw new err("User is not  authorized or token not found");
      }
      next(); // ✅ Move to next middleware
    });
  } else {
    // No token
    res.status(401);
    throw new Error("Token not found or malformed");
  }
});

module.exports = validateToken;
