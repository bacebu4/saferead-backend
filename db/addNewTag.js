/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const addNewTag = async (userId, tagId, noteId, name, hue) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    insert into tags(tag_id, tag_name, hue, user_id) 
    VALUES ($1, $2, $3, $4)
  `,
    [tagId, name, hue, userId],
  );

  return data;
};

module.exports = {
  addNewTag,
};
