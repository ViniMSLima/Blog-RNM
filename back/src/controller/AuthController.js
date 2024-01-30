const { User } = require("../model/Login");
const jwt = require("jsonwebtoken");
const { Author } = require("../model/author");
require("dotenv").config();
const CryptoJS = require("crypto-js");

class AuthControler {
  static async register(req, res) {
    var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
    const decryptd = bytes.toString(CryptoJS.enc.Utf8);
    const json = JSON.parse(decryptd);

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

  static async login(req, res) {
    var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
    const decryptd = bytes.toString(CryptoJS.enc.Utf8);
    const json = JSON.parse(decryptd);
    const { email, password } = json;

    if (!email)
      return res.status(422).json({ message: "O e-mail é obrigatório" });

    if (!password)
      return res.status(422).json({ message: "A senha é obrigatória" });
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(422).json({ message: "Usuário e/ou senha inválido" });

    var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const decryptd2 = bytes.toString(CryptoJS.enc.Utf8);
    const json2 = JSON.parse(decryptd2);

    if( json2 != password)
      return res.status(422).send({ message: "senha invalida!!!!!!!!"})

    try {
      const secret = process.env.SECRET
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        {
          expiresIn: '2 days'
        }
      );
      return res.status(200).send({ token: token })
    } catch (error) {
      return res.status(500).send({ message: "Something failed", data: error.message })
    }
  }
}

module.exports = AuthControler;
