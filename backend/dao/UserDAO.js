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

  // Update the given user

  static async updateUser(userId, updateFields) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (error) {
      console.error('Error in UserDAO UPDATE USER:', error);
      throw error;
    }
  }
}

module.exports = UserDAO;
