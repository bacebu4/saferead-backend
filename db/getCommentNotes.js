const { getConnection } = require("typeorm");

const getCommentNotes = async (id) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select *
    from comments
    where note_id = $1;
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getCommentNotes,
};
