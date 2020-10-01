const { createConnection } = require('typeorm');
require('reflect-metadata');

let MANAGER;

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
    MANAGER = connection.manager;
    const cats = await MANAGER.query('SELECT * FROM cats');
    console.log(cats);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  init,
  MANAGER,
};
