/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const deleteTagFromNote = async (note_id, tag_id) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    delete from notes_tags
    where note_id = $1 and tag_id = $2;
  `,
    [note_id, tag_id],
  );

  return data;
};

module.exports = {
  deleteTagFromNote,
};
