const notesResolver = require("./notes");
const infoResolver = require("./info");
const tagsResolver = require("./tags");
const booksResolver = require("./books");
const commentsResolver = require("./comments");

module.exports = {
  commentsResolver,
  booksResolver,
  tagsResolver,
  infoResolver,
  notesResolver,
};
