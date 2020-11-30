import { manager } from "./index";

const getLatestBooks = async (id) => {
  const raw = await manager.query(
    /* sql */ `
    select distinct book_title, author_full_name, book_id from (
      select distinct book_title, author_full_name, createdAt, b.book_id from notes
          join books b on notes.book_id = b.book_id
          join authors a on a.author_id = b.author_id
          where notes.user_id = $1
          order by createdAt desc
      ) as t
    limit 10
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getLatestBooks,
};
