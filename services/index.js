const gmailService = require("./gmail.service");
const notesService = require("./notes.service");
const updateService = require("./update.service");
const infoService = require("./info.service");
const authService = require("./auth.service");
const tagsService = require("./tags.service");
const commentsService = require("./comments.service");
const booksService = require("./books.service");

module.exports = {
  gmailService,
  notesService,
  updateService,
  infoService,
  tagsService,
  authService,
  commentsService,
  booksService,
};
