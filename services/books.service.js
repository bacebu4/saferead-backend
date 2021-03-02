/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function deleteBook(bookId) {
  try {
    await db.deleteBook(bookId);
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

async function getLatestBooks(userId) {
  try {
    const data = await db.getLatestBooks(userId);
    return data;
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  deleteBook,
  getAllBooks,
  getLatestBooks,
};
