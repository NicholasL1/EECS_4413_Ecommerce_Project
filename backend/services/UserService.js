const UserDAO = require("../dao/UserDAO.js");

class UserService {
  static async login() {
    // do any calculations if necessary here

    // call mongodb and get result
    // call DAO

    // do wtvr w data u get
    // return whatever m=essage/data
    return { msg: "logged in" };
  }

  static async register({ email, password, first_name, last_name, address }) {
    // check if email is already in use
    const userExists = await UserDAO.checkUserExists(email);
    if (userExists) {
      throw new Error("User already exists");
    }
    return UserDAO.registerUser(
      email,
      password,
      first_name,
      last_name,
      address
    );

    // register them
  }

  static async logout() {}
}

module.exports = UserService;
