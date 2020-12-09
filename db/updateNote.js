/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const updateNote = async (note_id, note_text) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    update notes
    set note_text = $1
    where note_id = $2;
  `,
    [note_text, note_id],
  );
  return data;
};

module.exports = {
  updateNote,
};
