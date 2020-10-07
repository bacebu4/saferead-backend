const db = require('../db');
const messageService = require('./messages.service');

async function start(data, id) {
  try {
    const authorId = await db.addAuthor(data.extractedAuthor);
    console.log('authorId: ', authorId);

    const bookId = await db.addBook(authorId, data.extractedTitle);
    console.log('bookId: ', bookId);

    const userId = await db.getIdByEmail(data.extractedEmail);
    if (userId) {
      await db.addNotes(userId, bookId, data.extractedNotes);
    } else {
      console.log('User was not found');
    }
  } catch (error) {
    console.log('Error during adding note to db. The message will be deleted');
    console.log(error);
    messageService.deleteMessageById(id);
  }
}

module.exports = {
  start,
};
