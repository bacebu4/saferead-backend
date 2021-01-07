const { getConnection } = require("typeorm");

const getLatestTags = async (userId) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select distinct(tag_id), tag_name, hue, createdAt
    from tags
    join notes n on tags.user_id = n.user_id
    where tags.user_id = $1
    order by createdAt desc
    limit 10;
  `,
    [userId],
  );
  return raw;
};

module.exports = {
  getLatestTags,
};
