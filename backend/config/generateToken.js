const jwt = require("jsonwebtoken");

/**
 *
 * @param  {email, password, first_name, last_name, address} -> userData
 * @returns HS384 Encrypted Token which contains all userData in the payload
 */
const generateToken = (...userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };
