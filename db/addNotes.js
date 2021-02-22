const { getConnection } = require("typeorm");

const { v4: uuidv4 } = require("uuid");

const addNote = async (userId, bookId, note) => {
  const newGeneratedNoteId = uuidv4();
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    insert into notes(user_id, book_id, createdAt, note_text, note_id, current_value, initial_value)
    VALUES ($1, $2, now(), $3, $4, 1, 1);
  `,
    [userId, bookId, note.extractedNote, newGeneratedNoteId],
  );

  if (note && note.extractedComment) {
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
  const addNotesQueue = [];
  for (const note of notes) {
    addNotesQueue.push(addNote(userId, bookId, note));
  }

  await Promise.all(addNotesQueue);
};

module.exports = {
  addNotes,
};
