const notesResolver = require("./notes");
const infoResolver = require("./info");
const tagsResolver = require("./tags");
const booksResolver = require("./books");
const commentsResolver = require("./comments");
const authResolver = require("./auth");
const dateScalarResolver = require("./dateScalar");

module.exports = {
  authResolver,
  commentsResolver,
  booksResolver,
  tagsResolver,
  infoResolver,
  notesResolver,
  dateScalarResolver,
};
