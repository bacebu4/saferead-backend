/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const getNotesByBook = async (id, book_id) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select note_text, book_title, author_full_name, n.note_id
    from users
        join notes n on users.user_id = n.user_id
        join books b on n.book_id = b.book_id
        join authors a on b.author_id = a.author_id
    where users.user_id = $1 and b.book_id = $2;
  `,
    [id, book_id],
  );
  return raw;
};

module.exports = {
  getNotesByBook,
};
