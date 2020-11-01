import { manager } from "./index";

const getAllTags = async (id) => {
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
