const { getConnection } = require("typeorm");

const getTagNotes = async (id) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select *
    from notes_tags
    join tags t on notes_tags.tag_id = t.tag_id
    where note_id = $1;
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getTagNotes,
};
