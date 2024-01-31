const express = require("express");
const AuthorController = require("../controller/AuthorController");
const route = express.Router();

route
    .post("/register", AuthorController.register);

module.exports = route;
