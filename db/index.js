const { createConnection } = require("typeorm");
const schedule = require("node-schedule");
require("reflect-metadata");
const { getNotes } = require("./getNotes");
const { getIdByEmail } = require("./getIdByEmail");
const { getIdPasswordByEmail } = require("./getIdPasswordByEmail");
const { markAsSeen } = require("./markAsSeen");
const { resetSeenFlag } = require("./resetSeenFlag");
const { addAuthor } = require("./addAuthor");
const { addBook } = require("./addBook");
const { addNotes } = require("./addNotes");
const { getTagNotes } = require("./getTagNotes");
const { getAmount } = require("./getAmount");
const { getAllTags } = require("./getAllTags");
const { getAccountInfo } = require("./getAccountInfo");
const { getLatestBooks } = require("./getLatestBooks");
const { addUser } = require("./addUser");
const { addExistingTag } = require("./addExistingTag");
const { addNewTag } = require("./addNewTag");
const { deleteTagFromNote } = require("./deleteTagFromNote");
const { searchNotes } = require("./searchNotes");
const { deleteNote } = require("./deleteNote");
const { updateTag } = require("./updateTag");
const { updateNote } = require("./updateNote");
const { updateComment } = require("./updateComment");
const { getCommentNotes } = require("./getCommentNotes");
const { addComment } = require("./addComment");
const { deleteComment } = require("./deleteComment");
const { getNotesByBook } = require("./getNotesByBook");
const { deleteTag } = require("./deleteTag");
const { getNote } = require("./getNote");
const { setReviewed } = require("./setReviewed");
const { setNewDay } = require("./setNewDay");
const { getNotesByTag } = require("./getNotesByTag");
const { deleteBook } = require("./deleteBook");
// const { deployDb } = require("./deployDb");

// eslint-disable-next-line import/no-mutable-exports

const startSchedule = () => {
  schedule.scheduleJob("0 0 * * *", () => {
    console.log("this is schedule every day");
    setNewDay();
  });
};

const init = async () => {
  try {
    if (process.env.DATABASE_URL) {
      await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
      });
      console.log("Connected to DB @ heroku");
    } else {
      await createConnection({
        type: "postgres",
        host: "localhost",
        port: process.env.DB_PORT,
        username: "postgres",
        password: "123",
        database: "postgres",
        // logging: true,
      });
      console.log("Connected to DB locally");
    }
    startSchedule();
    // deployDb();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  init,
  getNotes,
  markAsSeen,
  resetSeenFlag,
  addAuthor,
  addBook,
  addNotes,
  getIdByEmail,
  getTagNotes,
  getAmount,
  getAllTags,
  getAccountInfo,
  getLatestBooks,
  addUser,
  getIdPasswordByEmail,
  addExistingTag,
  addNewTag,
  deleteTagFromNote,
  searchNotes,
  deleteNote,
  updateTag,
  updateNote,
  updateComment,
  getCommentNotes,
  addComment,
  deleteComment,
  getNotesByBook,
  deleteTag,
  getNote,
  setReviewed,
  setNewDay,
  getNotesByTag,
  deleteBook,
};
