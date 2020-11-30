/* eslint-disable camelcase */
import { manager } from "./index";

const deleteBook = async (book_id) => {
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
