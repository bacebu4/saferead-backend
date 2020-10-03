import { manager } from './index';

const addBook = async (authorId, title) => {
  let data = await manager.query(/* sql */`
    select book_id
    from books
    where book_title = $1;
  `, [title]);

  if (data.length) {
    return data[0].book_id;
  }

  await manager.query(/* sql */`
    insert into books(author_id, book_title) VALUES ($1, $2);
  `, [authorId, title]);
  data = await manager.query(/* sql */`
    SELECT currval(pg_get_serial_sequence('books','book_id'));
  `);
  return data[0].currval;
};

module.exports = {
  addBook,
};
