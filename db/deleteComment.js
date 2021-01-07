/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const deleteComment = async (comment_id) => {
  const manager = await getConnection();
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
