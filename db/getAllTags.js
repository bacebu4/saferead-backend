const { getConnection } = require("typeorm");

const getAllTags = async (id) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select tag_id, tag_name, hue
    from tags
    where user_id = $1
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getAllTags,
};
