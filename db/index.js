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

// eslint-disable-next-line import/no-mutable-exports
let manager;

const init = async () => {
  try {
    let connection;
    if (process.env.DATABASE_URL) {
      connection = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
      });
      console.log("Connected to DB @ heroku");
    } else {
      connection = await createConnection({
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
    manager = connection.manager;
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
};

export {
  // eslint-disable-next-line import/prefer-default-export
  manager,
};
