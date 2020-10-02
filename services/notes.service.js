const db = require('../db');

// TODO func get random amount

async function getNotes(id, amount) {
  const data = await db.getNotes(id);
  return data;
}

module.exports = {
  getNotes,
};
