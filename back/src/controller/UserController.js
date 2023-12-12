const { User } = require("../model/Login");

class UserController {
  static async getUser(_id) {
    try {
      console.log("CU user1");
      const user = await User.findById(_id);
      return user;
    } catch (error) {
      return res.status(404).send({ error: "User not found!" });
    }
  }
}

module.exports = UserController;
