const notesResolver = require("./notes");
const infoResolver = require("./info");
const tagsResolver = require("./tags");
const booksResolver = require("./books");
const commentsResolver = require("./comments");
const loginResolver = require("./login");

module.exports = {
  loginResolver,
  commentsResolver,
  booksResolver,
  tagsResolver,
  infoResolver,
  notesResolver,
};
