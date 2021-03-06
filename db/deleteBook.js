const { getConnection } = require("typeorm");

const deleteBook = async (bookId) => {
  const manager = await getConnection();

  const data = await manager.query(
    /* sql */ `
    delete from books
    where book_id = $1;
  `,
    [bookId],
  );

  // deleting daily notes that refers to that book
  await manager.query(
    /* sql */ `
    WITH x AS (
      SELECT
        dn. "noteId"
      FROM
        daily_notes dn
      LEFT JOIN notes n ON dn. "noteId" = n.note_id
      WHERE
        date_part('year',
          dn.date) = date_part('year',
          now())
        AND date_part('month',
          dn.date) = date_part('month',
          now())
        AND date_part('day',
          dn.date) = date_part('day',
          now())
        AND n.book_id = $1
    ) DELETE FROM daily_notes dn
    WHERE dn. "noteId" in(
        SELECT
          "noteId" FROM x);
    `,
    [bookId],
  );

  return data;
};

module.exports = {
  deleteBook,
};
