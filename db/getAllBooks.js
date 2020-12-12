const { getConnection } = require("typeorm");

const getAllBooks = async (id) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select *
    from books b
    join authors a on a.author_id = b.author_id
    where user_id = $1
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getAllBooks,
};
