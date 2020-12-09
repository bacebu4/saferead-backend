/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const deleteNote = async (note_id) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    delete from notes
    where note_id = $1;
  `,
    [note_id],
  );

  return data;
};

module.exports = {
  deleteNote,
};
