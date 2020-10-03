const db = require('../db');

async function start(data) {
  const authorId = await db.addAuthor(data.extractedAuthor);
  console.log('authorId: ', authorId);

  const bookId = await db.addBook(authorId, data.extractedTitle);
  console.log('bookId: ', bookId);

  const id = await db.getIdByEmail(data.extractedEmail);

  await db.addNotes(id, bookId, data.extractedNotes);
}

module.exports = {
  start,
};
