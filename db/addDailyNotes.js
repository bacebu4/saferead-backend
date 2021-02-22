/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const addDailyNotes = async (noteIds, userId) => {
  const manager = await getConnection();
  const addQueue = [];
  for (const noteId of noteIds) {
    const data = manager.query(
      /* sql */ `
      insert into daily_notes("noteId", "userId") 
      VALUES ($1, $2);
    `,
      [noteId, userId],
    );
    addQueue.push(data);
  }
  await Promise.all(addQueue);
};

module.exports = {
  addDailyNotes,
};
