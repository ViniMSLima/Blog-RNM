const { Author } = require("../model/author");
const { User } = require("../model/Login");
require("dotenv").config();
const CryptoJS = require("crypto-js");

class AuthorController {
  static async register(req, res) {
    var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
    const decryptd = bytes.toString(CryptoJS.enc.Utf8);
    const json = JSON.parse(decryptd);

    const { name, birth, email, password, confirmPassword } = json;

    if (!name) return res.status(400).json({ message: "Name is mandatory" });

    if (!email) return res.status(400).json({ message: "E-mail is mandatory" });

    if (!password)
      return res.status(400).json({ message: "Password is mandatory" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords doesn't match" });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(422).json({ message: "E-mail already in use" });

    const passwordCrypt = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    const author = new Author({
      name,
      email,
      birth,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });
    const user = new User({
      login: email,
      author,
      email,
      password: passwordCrypt,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    try {
      await User.create(user);
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }
}

module.exports = AuthorController;
