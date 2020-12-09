/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const deleteTag = async (tag_id) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    delete from tags
    where tag_id = $1;
  `,
    [tag_id],
  );

  return data;
};

module.exports = {
  deleteTag,
};
