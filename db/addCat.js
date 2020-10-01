import { manager } from './index';

const addCat = async () => {
  const raw = await manager.query(/* sql */`
    insert into cats(id, name, birthday) values (1, 'Bars', '2020-01-04')
  `);
  console.log(raw);
};

module.exports = {
  addCat,
};
