import { manager } from './index';

const addAuthor = async (author) => {
  let data = await manager.query(/* sql */`
    select author_id
    from authors
    where author_full_name = $1;
  `, [author]);

  if (data.length) {
    return data[0].author_id;
  }

  await manager.query(/* sql */`
    insert into authors(author_full_name) values ($1);
  `, [author]);
  data = await manager.query(/* sql */`
    SELECT currval(pg_get_serial_sequence('authors','author_id'));
  `);
  return data[0].currval;
};

module.exports = {
  addAuthor,
};
