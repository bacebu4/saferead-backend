const messages = require("./messages.controller");
const notes = require("./notes.controller");
const info = require("./info.controller");
const register = require("./register.controller");
const login = require("./login.controller");
const tags = require("./tags.controller");
const comments = require("./comments.controller");

module.exports = {
  notes,
  messages,
  info,
  login,
  register,
  tags,
  comments,
};
