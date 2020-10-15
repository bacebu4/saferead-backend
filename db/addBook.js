import { manager } from './index';

const { v4: uuidv4 } = require('uuid');

const addBook = async (authorId, title) => {
  const data = await manager.query(/* sql */`
    select book_id
    from books
    where book_title = $1;
  `, [title]);

  if (data.length) {
    return data[0].book_id;
  }

  const newGeneratedId = uuidv4();

  await manager.query(/* sql */`
    insert into books(book_id, author_id, book_title) VALUES ($1, $2, $3);
  `, [newGeneratedId, authorId, title]);

  return newGeneratedId;
};

module.exports = {
  addBook,
};
