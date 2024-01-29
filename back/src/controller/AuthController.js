const { User } = require("../model/Login");
const jwt = require("jsonwebtoken");
const { Author } = require("../model/author");
require("dotenv").config();
const CryptoJS = require("crypto-js");

class AuthControler {
  static async register(req, res) 
  {
    const { name, birth, email, password, confirmPassword } = req.body;

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

module.exports = AuthControler;
