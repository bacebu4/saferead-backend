const messagesService = require("./messages.service");
const notesService = require("./notes.service");
const updateService = require("./update.service");
const infoService = require("./info.service");
const registerService = require("./register.service");
const loginService = require("./login.service");
const tagsService = require("./tags.service");

module.exports = {
  messagesService,
  notesService,
  updateService,
  infoService,
  tagsService,
  loginService,
  registerService,
};
