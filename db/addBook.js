const { getConnection } = require("typeorm");

const { v4: uuidv4 } = require("uuid");

const addBook = async (authorId, title, userId) => {
  const manager = await getConnection();
  const [data] = await manager.query(
    /* sql */ `
    select book_id
    from books
    where book_title = $1 and user_id = $2;
  `,
    [title, userId],
  );

  if (data && data.book_id) {
    return data.book_id;
  }

  const newGeneratedId = uuidv4();

  await manager.query(
    /* sql */ `
    insert into books(book_id, author_id, book_title, user_id) VALUES ($1, $2, $3, $4);
  `,
    [newGeneratedId, authorId, title, userId],
  );

  return newGeneratedId;
};

module.exports = {
  addBook,
};
