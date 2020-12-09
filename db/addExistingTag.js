/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const addExistingTag = async (tag_id, note_id) => {
  const manager = await getConnection();
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
