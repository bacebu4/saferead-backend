/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function addExistingTag(payload) {
  try {
    await db.addExistingTag(payload.tag_id, payload.note_id);
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  addExistingTag,
};
