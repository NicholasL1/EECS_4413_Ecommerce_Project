const dotenv = require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc

const verifyToken = (req, res, next) => {
  const token = req.headers.autgh;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to request object
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
