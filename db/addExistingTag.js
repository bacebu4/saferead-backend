/* eslint-disable camelcase */
import { manager } from "./index";

const addExistingTag = async (tag_id, note_id) => {
  const data = await manager.query(
    /* sql */ `
    insert into notes_tags(tag_id, note_id) 
    VALUES ($1, $2);
  `,
    [tag_id, note_id],
  );

  return data;
};

module.exports = {
  addExistingTag,
};
