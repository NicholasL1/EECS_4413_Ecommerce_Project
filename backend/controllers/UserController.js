const express = require("express");
const router = express.Router();

const UserService = require("../services/UserService.js");
router.post("/login", async (req, res) => {
  console.log(req.params);
  const response = await UserService.login(); // send login info
  res.send("login endpoint -- " + response.msg);
});

router.post("/logout", async (req, res) => {});

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, address } = req.body;

  // check if all fields are filled
  if (!email || !password || !first_name || !last_name) {
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

    res.status(201).json({
      _id: user._id,
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
