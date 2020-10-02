const { createConnection } = require('typeorm');
require('reflect-metadata');
const { getNotes } = require('./getNotes');

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
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  init,
  getNotes,
};

export {
  // eslint-disable-next-line import/prefer-default-export
  manager,
};
