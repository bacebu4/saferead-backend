const db = require("../db");
const messageService = require("./messages.service");

async function start(extractedData, id) {
  try {
    const userId = await db.getIdByEmail(extractedData.extractedEmail);

    if (userId) {
      const authorId = await db.addAuthor(extractedData.extractedAuthor);
      console.log("authorId: ", authorId);

      const bookId = await db.addBook(
        authorId,
        extractedData.extractedTitle,
        userId,
      );
      console.log("bookId: ", bookId);

      await db.addNotes(userId, bookId, extractedData.extractedNotes);
    } else {
      console.log("User was not found");
    }
  } catch (error) {
    console.log("Error during adding note to db. The message will be deleted");
    console.log(error);
    messageService.deleteMessageById(id);
  }
}

module.exports = {
  start,
};
