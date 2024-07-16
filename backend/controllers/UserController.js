const express = require("express");
const router = express.Router();

const UserService = require("../services/UserService.js");
const { generateToken } = require("../config/generateToken.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  /*
logs in 
gen jwt 
return jwt back to client
store jwt on local storage (client side)
*/

  // call UserService to login
  try {
    const user = await UserService.login(email, password); // send login info
    res.status(201).json({
      token: generateToken(
        user._id,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address
      ),
    });
  } catch (error) {}
});

router.post("/logout", async (req, res) => {});

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, address } = req.body;

  // check if all fields are filled
  if (!email || !password || !first_name || !last_name || !address) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // call UserService to register
  // temp ==> const response =
  try {
    const user = await UserService.register({
      email,
      password,
      first_name,
      last_name,
      address,
    });

    // Create cart model here using user's id --> user._id

    // ToDo -- store generated token on the client-side
    res.status(201).json({
      token: generateToken(
        user._id,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address
      ),
    });
  } catch (error) {
    if (error.message.includes("User already exists")) {
      res.send("User already exists.");
    } else {
      throw new Error(error);
    }
  }
});

module.exports = router;
