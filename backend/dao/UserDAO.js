const User = require("../models/UserModel");
const mongoose = require("mongoose");

class UserDAO {
  // get user related stuff from mongo here

  // NOTE -- pass parameters as objects: {...}

  static async checkUserExists(email) {
    const userExists = await User.findOne({ email: email });
    return userExists;
  }

  static async registerUser(email, password, first_name, last_name, address) {
    const user = await User.create({
      email,
      password,
      first_name,
      last_name,
      address,
    });

    if (user) {
      return user;
    }
  }

  static async validateLogin() {
    // mongoose query
  }
}

module.exports = UserDAO;
