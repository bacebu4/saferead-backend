/* eslint-disable camelcase */
import { manager } from "./index";

const deleteNote = async (note_id) => {
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
