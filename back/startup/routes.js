const express = require("express");
const article = require("../src/routes/article");
const author = require("../src/routes/author");
const auth = require("../src/routes/auth");

module.exports = function (app) {
    app
        .use(express.json())
        .use("/api/article", article)
        .use("/api/author", author)
        .use("/api/auth", auth)
};
