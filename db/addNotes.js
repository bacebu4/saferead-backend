import { manager } from "./index";

const { v4: uuidv4 } = require("uuid");

const addNote = async (userId, bookId, note) => {
  const newGeneratedNoteId = uuidv4();
  await manager.query(
    /* sql */ `
    insert into notes(user_id, book_id, createdAt, note_text, seen, note_id)
    VALUES ($1, $2, now(), $3, false, $4);
  `,
    [userId, bookId, note.extractedNote, newGeneratedNoteId],
  );

  if (note?.extractedComment) {
    const newGeneratedCommentId = uuidv4();
    await manager.query(
      /* sql */ `
      insert into comments(note_id, comment_text, createdAt, comment_id) VALUES ($1, $2, now(), $3);
  `,
      [newGeneratedNoteId, note.extractedComment, newGeneratedCommentId],
    );
  }
};

const addNotes = async (userId, bookId, notes) => {
  // TODO delete restricted syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const note of notes) {
    await addNote(userId, bookId, note);
  }
};

module.exports = {
  addNotes,
};
