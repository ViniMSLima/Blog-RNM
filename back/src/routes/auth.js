const express = require("express");
const AuthorController = require("../controller/AuthController");
const route = express.Router();

route
    .post("/", AuthorController.login);

module.exports = route;
