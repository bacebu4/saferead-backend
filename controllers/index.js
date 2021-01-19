const messages = require("./messages.controller");
const notes = require("./notes.controller");
const info = require("./info.controller");
const login = require("./login.controller");
const tags = require("./tags.controller");
const comments = require("./comments.controller");
const books = require("./books.controller");

module.exports = {
  notes,
  messages,
  info,
  login,
  tags,
  books,
  comments,
};
