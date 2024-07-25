const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

class UserDAO {
  static async findUser(userId) {
    console.log(userId);
    try {
      const user = await User.findById({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error);
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

  static async updateUser(user_id, values) {
    try {
      const update = await User.updateOne(
        {
          _id: user_id,
        },
        values
      );

      if (update.modifiedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserDAO;
