const { createConnection } = require("typeorm");
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
const { getNotesByTag } = require("./getNotesByTag");
const { deleteBook } = require("./deleteBook");
const { getAllBooks } = require("./getAllBooks");
const { getLatestReviewDate } = require("./getLatestReviewDate");
const { updateReviewHistory } = require("./updateReviewHistory");
const { getStreakBeginning } = require("./getStreakBeginning");
const { getDailyNotes } = require("./getDailyNotes");
const { addDailyNotes } = require("./addDailyNotes");
const { getLatestTags } = require("./getLatestTags");
const { updateReviewAmount } = require("./updateReviewAmount");
const { getReviewHistoryThisWeek } = require("./getReviewHistoryThisWeek");

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
  getNotesByTag,
  deleteBook,
  getAllBooks,
  getLatestReviewDate,
  updateReviewHistory,
  getStreakBeginning,
  getDailyNotes,
  addDailyNotes,
  getLatestTags,
  updateReviewAmount,
  getReviewHistoryThisWeek,
};
