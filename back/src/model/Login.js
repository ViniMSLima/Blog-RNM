const mongoose = require("mongoose");
const { authorSchema } = require("./author");

const userSchema = 
new mongoose.Schema({
  author: {
    type: authorSchema,
    required: true,
  },
  login: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  removedAt: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
exports.User = User;
exports.userSchema = userSchema;