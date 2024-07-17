const UserDAO = require("../dao/UserDAO.js");

class UserService {
  static async login(email, password) {
    // check if email exists
    const user = UserDAO.validateLogin(email, password);
    return user;
  }

  static async register(
    cart_id,
    email,
    password,
    first_name,
    last_name,
    address
  ) {
    // check if email is already in use
    const userExists = await UserDAO.checkUserExists(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    return UserDAO.registerUser(
      cart_id,
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
