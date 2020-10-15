const { createConnection } = require('typeorm');
require('reflect-metadata');
const { getNotes } = require('./getNotes');
const { getIdByEmail } = require('./getIdByEmail');
const { markAsSeen } = require('./markAsSeen');
const { resetSeenFlag } = require('./resetSeenFlag');
const { addAuthor } = require('./addAuthor');
const { addBook } = require('./addBook');
const { addNotes } = require('./addNotes');

// eslint-disable-next-line import/no-mutable-exports
let manager;

const init = async () => {
  try {
    let connection;
    if (process.env.DATABASE_URL) {
      connection = await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
      });
      console.log('Connected to DB @ heroku');
    } else {
      connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: process.env.DB_PORT,
        username: 'postgres',
        password: '123',
        database: 'postgres',
        logging: true,
      });
      console.log('Connected to DB locally');
    }
    manager = connection.manager;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  init,
  getNotes,
  markAsSeen,
  resetSeenFlag,
  addAuthor,
  addBook,
  addNotes,
  getIdByEmail,
};

export {
  // eslint-disable-next-line import/prefer-default-export
  manager,
};