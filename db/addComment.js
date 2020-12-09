/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const addComment = async (note_id, comment_id, comment_text) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    insert into comments(note_id, comment_text, updatedAt, comment_id) 
    VALUES ($1, $2, now(), $3);
  `,
    [note_id, comment_text, comment_id],
  );
};

module.exports = {
  addComment,
};
