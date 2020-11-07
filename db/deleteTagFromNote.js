/* eslint-disable camelcase */
import { manager } from "./index";

const deleteTagFromNote = async (note_id, tag_id) => {
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
