/* eslint-disable camelcase */
import { manager } from "./index";

const deleteComment = async (comment_id) => {
  const data = await manager.query(
    /* sql */ `
    delete from comments
    where comment_id = $1;
  `,
    [comment_id],
  );

  return data;
};

module.exports = {
  deleteComment,
};
