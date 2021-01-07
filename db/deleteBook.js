/* eslint-disable camelcase */
const { getConnection } = require("typeorm");

const deleteBook = async (book_id) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    delete from books
    where book_id = $1;
  `,
    [book_id],
  );

  return data;
};

module.exports = {
  deleteBook,
};
