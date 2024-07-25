const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

class UserDAO {
  // get user related stuff from mongo here

  // NOTE -- pass parameters as objects: {...}
  static async findUser(userId) {
    try {
      const user =  await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error");
    }
  }

  static async checkUserExists(email) {
    const userExists = await User.findOne({ email: email });
    return userExists;
  }

  /**
   * @returns User
   */
  static async registerUser(
    cart_id,
    email,
    password,
    first_name,
    last_name,
    address
  ) {
    const hashed_password = await bcrypt.hash(password, 10);
    const user = await User.create({
      cart_id,
      email,
      password: hashed_password,
      first_name,
      last_name,
      address,
    });

    if (user) {
      return user;
    } else {
      throw new Error("Invalid user data");
    }
  }

  static async validateLogin(email, password) {
    const user = await this.checkUserExists(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new Error("Invalid Login Credentials");
    }
  }
}

module.exports = UserDAO;
