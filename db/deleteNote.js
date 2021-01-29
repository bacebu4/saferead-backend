/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const deleteNote = async (noteId) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    delete from notes
    where note_id = $1;
  `,
    [noteId],
  );

  await manager.query(
    /* sql */ `
    delete from daily_notes
    where note_id = $1;
  `,
    [noteId],
  );
};

module.exports = {
  deleteNote,
};
