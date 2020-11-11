/* eslint-disable camelcase */
import { manager } from "./index";

const updateTag = async (note_id, note_text) => {
  const data = await manager.query(
    /* sql */ `
    update note
    set note_text = $1
    where note_id = $2;
  `,
    [note_text, note_id],
  );

  return data;
};

module.exports = {
  updateTag,
};
