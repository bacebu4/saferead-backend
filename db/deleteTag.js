/* eslint-disable camelcase */
import { manager } from "./index";

const deleteTag = async (tag_id) => {
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
