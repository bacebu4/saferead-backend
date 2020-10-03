import { manager } from './index';

const addNote = async (userId, bookId, note) => {
  await manager.query(/* sql */`
    insert into notes(user_id, book_id, createdAt, updatedAt, note_text, seen)
    VALUES ($1, $2, now(), now(), $3, false);
  `, [userId, bookId, note.extractedNote]);

  if (note?.extractedComment) {
    const data = await manager.query(/* sql */`
      SELECT currval(pg_get_serial_sequence('notes','note_id'));
    `);
    await manager.query(/* sql */`
      insert into comments(note_id, comment_text, createdAt, updatedAt) VALUES ($1, $2, now(), now());
  `, [data[0].currval, note.extractedComment]);
  }
};

const addNotes = async (userId, bookId, notes) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const note of notes) {
    await addNote(userId, bookId, note);
  }
};

module.exports = {
  addNotes,
};
