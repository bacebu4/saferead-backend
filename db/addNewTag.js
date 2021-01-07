/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const addNewTag = async (user_id, payload) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    insert into tags(tag_id, tag_name, hue, user_id) 
    VALUES ($1, $2, $3, $4)
  `,
    [payload.tag_id, payload.tag_name, payload.hue, user_id],
  );

  return data;
};

module.exports = {
  addNewTag,
};
