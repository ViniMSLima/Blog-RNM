const express = require("express");
const AuthorController = require("../controller/AuthorController");
const route = express.Router();

route
    .post("/", AuthorController.register);

module.exports = route;
