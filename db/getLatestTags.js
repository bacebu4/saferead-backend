const { getConnection } = require("typeorm");

const getLatestTags = async (userId) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    SELECT
      tag_id,
      tag_name,
      hue
    FROM
      tags
    WHERE
      tags.user_id = $1
    ORDER BY
      updated_at DESC
    LIMIT 10;
  `,
    [userId],
  );
  return raw;
};

module.exports = {
  getLatestTags,
};
