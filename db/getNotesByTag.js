/* eslint-disable camelcase */
import { manager } from "./index";

const getNotesByTag = async (id, tag_id) => {
  const raw = await manager.query(
    /* sql */ `
    select note_text, book_title, author_full_name, n.note_id, nt.tag_id, t.tag_name
from users
    join notes n on users.user_id = n.user_id
    join books b on n.book_id = b.book_id
    join authors a on b.author_id = a.author_id
    join notes_tags nt on n.note_id = nt.note_id
    join tags t on nt.tag_id = t.tag_id
where users.user_id = $1 and nt.tag_id = $2;
  `,
    [id, tag_id],
  );
  return raw;
};

module.exports = {
  getNotesByTag,
};
