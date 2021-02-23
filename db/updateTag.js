const { getConnection } = require("typeorm");

const updateTag = async (tagName, tagId, hue) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    UPDATE
      tags
    SET
      tag_name = $1,
      hue = $2,
      updated_at = now()
    WHERE
      tag_id = $3;
  `,
    [tagName, hue, tagId],
  );

  return data;
};

module.exports = {
  updateTag,
};
