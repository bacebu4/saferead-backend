const noteReducer = require("./noteReducer");
const tagReducer = require("./tagReducer");
const bookReducer = require("./bookReducer");
const accountInfoReducer = require("./accountInfoReducer");
const noteReducerWithoutTagsAndComments = require("./noteReducerWithoutTagsAndComments");

module.exports = {
  accountInfoReducer,
  bookReducer,
  tagReducer,
  noteReducer,
  noteReducerWithoutTagsAndComments,
};
