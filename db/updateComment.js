/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const updateComment = async (comment_id, comment_text) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    update comments
    set comment_text = $1
    where comment_id = $2;
  `,
    [comment_text, comment_id],
  );

  return data;
};

module.exports = {
  updateComment,
};
