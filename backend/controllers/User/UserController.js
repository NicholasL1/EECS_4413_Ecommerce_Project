const express = require("express");
const router = express.Router();

const UserService = require("../../services/User/UserService.js");
router.get("/login", async (req, res) => {
  console.log(req.params);
  const response = await UserService.login(); // send login info
  res.send("login endpoint -- " + response.msg);
});

module.exports = router;
