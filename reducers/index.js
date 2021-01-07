const noteReducer = require("./noteReducer");
const tagReducer = require("./tagReducer");
const bookReducer = require("./bookReducer");
const accountInfoReducer = require("./accountInfoReducer");
const commentReducer = require("./commentReducer");

module.exports = {
  commentReducer,
  accountInfoReducer,
  bookReducer,
  tagReducer,
  noteReducer,
};
