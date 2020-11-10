/* eslint-disable camelcase */
import { manager } from "./index";

const updateTag = async (tag_name, tag_id) => {
  const data = await manager.query(
    /* sql */ `
    update tags
    set tag_name = $1
    where tag_id = $2;
  `,
    [tag_name, tag_id],
  );

  return data;
};

module.exports = {
  updateTag,
};
