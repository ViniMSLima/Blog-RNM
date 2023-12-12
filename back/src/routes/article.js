const ArticleController = require("../controller/ArticleController");
const express = require("express");

const route = express.Router();
route
    .post("/", ArticleController.create)
    .post('/like/', ArticleController.likeArticle)
    .post('/dislike/', ArticleController.dislikeArticle)

module.exports = route;
