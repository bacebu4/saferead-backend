import { manager } from "./index";

const getCommentNotes = async (id) => {
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
