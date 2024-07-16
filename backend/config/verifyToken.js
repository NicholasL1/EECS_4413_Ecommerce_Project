const dotenv = require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Middleware
const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get the user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = verifyToken;
