const { createConnection } = require('typeorm');
require('reflect-metadata');
const { addCat } = require('./addCat');

// eslint-disable-next-line import/no-mutable-exports
let manager;

const init = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
    });
    console.log('Connected to DB');
    manager = connection.manager;
    const cats = await manager.query('SELECT * FROM cats');
    console.log(cats);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
// eslint-disable-next-line import/prefer-default-export
export { manager };

module.exports = {
  init,
  addCat,
};
