const path = require("path");
const fs = require("fs");

const AuthorController = require("../controller/AuthorController");
const Article = require("../model/Article");

class ArticleController {
  static createLog(error) {
    const timestamp = Date.now();
    const archivePath = path.resolve(__dirname, "..", `logs-${timestamp}.txt`);
    const errorString = JSON.stringify(error.message);
    fs.writeFile(archivePath, errorString, function (err, result) {
      if (err) console.log(err);
    });
  }
  static async create(req, res) {
    const { title, text, authorid } = req.body;
    if (!title || !text || !authorid)
      return res.status(400).send({ message: "Fields can't be empty" });
    if (title.length < 3)
      return res
        .status(400)
        .send({ message: "Title can't be shorter than 3 characters" });
    if (text.length < 15)
      return res
        .status(400)
        .send({ message: "Article can't be shorter than 15 characters" });
    try {
      const author = await AuthorController.getAuthor(authorid);
      const article = {
        title,
        text,
        likes: 0,
        author,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        removedAt: null,
        ids: [],
      };
      await Article.create(article);
      return res.status(201).send({ message: "Article created successfully" });
    } catch (error) {
      ArticleController.createLog(error);
      return res
        .status(500)
        .send({ error: "Fail saving article", data: error.message });
    }
  }

  static async likeArticle(req, res) {
    const { articleId, userId } = req.body;

    if (!articleId || !userId)
      return res.status(400).send({ message: "Bad Request!" });
    try {
      const article = await Article.findById(articleId);

      if (!article.ids) {
        article.ids = [];
      }

      const likes = article.ids.length;

      await Article.findByIdAndUpdate(
        { _id: articleId },
        { $addToSet: { ids: userId } },
        { new: true }
      );

      const updatedArticle = await Article.findById(articleId);

      if (updatedArticle.ids.length === likes)
        return res.status(400).send({ error: "ids push failed" });
      else {
        await Article.findByIdAndUpdate(
          { _id: articleId },
          { likes: ++article.likes },
          { new: true }
        );

        return res.status(200).send({ message: "Liked!" });
      }
    } catch (error) {
      ArticleController.createLog(error);
      return res
        .status(500)
        .send({ error: "Like failed", data: error.message });
    }
  }

  static async dislikeArticle(req, res) {
    const { articleId, userId } = req.body;

    if (!articleId || !userId)
      return res.status(400).send({ message: "Bad Request!" });
    try {
      const article = await Article.findById(articleId);
      var updatedIds = [];
      var check = 0;

      if (!article.ids) {
        article.ids = [];
      }

      article.ids.forEach((element) => {
        if (element == userId) {
          updatedIds = article.ids.filter((item) => item !== userId);
          check++;
        }
         
      });

      if(check == 0)
        return res.status(400).send({error: "Dislike failed!"});

      await Article.findByIdAndUpdate(
        { _id: articleId },
        { $set: { ids: updatedIds }, likes: --article.likes },
        { new: true }
      );

      return res.status(200).send({ message: "dislike!" });

    } catch (error) {
      ArticleController.createLog(error);
      return res
        .status(500)
        .send({ error: "Like failed", data: error.message });
    }
  }
}

module.exports = ArticleController;
