const { getConnection } = require("typeorm");

const addExistingTag = async (tagId, noteId) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    insert into notes_tags(tag_id, note_id) 
    VALUES ($1, $2);
  `,
    [tagId, noteId],
  );

  await manager.query(
    /* sql */ `
    UPDATE
      tags
    SET
      updated_at = now()
    WHERE
      tag_id = $1;
    `,
    [tagId],
  );

  return data;
};

module.exports = {
  addExistingTag,
};
