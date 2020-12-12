/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function deleteBook(book_id) {
  try {
    await db.deleteBook(book_id);
  } catch (error) {
    throw new Error();
  }
}

async function getAllBooks(userId) {
  try {
    const data = await db.getAllBooks(userId);
    return data;
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  deleteBook,
  getAllBooks,
};
