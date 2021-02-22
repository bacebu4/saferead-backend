const { getConnection } = require("typeorm");

const getLatestTags = async (userId) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select tag_id, tag_name, hue
    from tags
    where tags.user_id = $1
    limit 10;
  `,
    [userId],
  );
  return raw;
};

module.exports = {
  getLatestTags,
};
