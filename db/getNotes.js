import { manager } from "./index";

const getNotes = async (id) => {
  const raw = await manager.query(
    /* sql */ `
    SELECT
      note_text,
      book_title,
      author_full_name,
      n.note_id
    FROM
      notes n
      JOIN books ON n.book_id = books.book_id
      JOIN authors ON books.author_id = authors.author_id
    WHERE
      n.user_id = $1 and seen = false;
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getNotes,
};
