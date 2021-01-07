/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const updateTag = async (tag_name, tag_id, hue) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    update tags
    set tag_name = $1, hue = $2
    where tag_id = $3;
  `,
    [tag_name, hue, tag_id],
  );

  return data;
};

module.exports = {
  updateTag,
};
