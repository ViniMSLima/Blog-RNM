const mongoose = require("mongoose");
const { userSchema } = require("./Login");

const commentSchema = new mongoose.Schema({
  user: {
    type: userSchema,
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  removedAt: {
    type: Date,
    required: false,
  },
  ids: [
    {
      type: String,
      ref: "User",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);
exports.Comment = Comment;
exports.commentSchema = commentSchema;
