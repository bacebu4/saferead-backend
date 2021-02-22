const { getConnection } = require("typeorm");

const getNotes = async (id) => {
  try {
    const manager = await getConnection();
    const raw = await manager.query(
      /* sql */ `
      SELECT
        note_text,
        book_title,
        author_full_name,
        n.note_id,
        n.current_value
      FROM
        notes n
        JOIN books ON n.book_id = books.book_id
        JOIN authors ON books.author_id = authors.author_id
      WHERE
        n.user_id = $1 and n.current_value > 0
      ORDER BY
        n.note_id;
    `,
      [id],
    );
    return raw;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getNotes,
};
