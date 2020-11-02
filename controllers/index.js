const messages = require("./messages.controller");
const notes = require("./notes.controller");
const info = require("./info.controller");
const register = require("./register.controller");
const login = require("./login.controller");

module.exports = {
  notes,
  messages,
  info,
  login,
  register,
};
