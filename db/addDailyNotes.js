/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const addDailyNotes = async (notes, userId) => {
  const manager = await getConnection();
  const addQueue = [];
  for (const note of notes) {
    const data = manager.query(
      /* sql */ `
      insert into daily_notes("noteId", "userId") 
      VALUES ($1, $2);
    `,
      [note.note_id, userId],
    );
    addQueue.push(data);
  }
  await Promise.all(addQueue);
};

module.exports = {
  addDailyNotes,
};
