const { getConnection } = require("typeorm");

const { v4: uuidv4 } = require("uuid");

const addAuthor = async (author) => {
  const manager = await getConnection();
  const [data] = await manager.query(
    /* sql */ `
    select author_id
    from authors
    where author_full_name = $1;
  `,
    [author],
  );

  if (data && data.author_id) {
    return data.author_id;
  }

  const newGeneratedId = uuidv4();

  await manager.query(
    /* sql */ `
    insert into authors(author_id, author_full_name) values ($1, $2);
  `,
    [newGeneratedId, author],
  );

  return newGeneratedId;
};

module.exports = {
  addAuthor,
};
