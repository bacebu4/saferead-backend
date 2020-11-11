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

async function addNewTag(userId, payload) {
  try {
    await db.addNewTag(userId, payload);
    await db.addExistingTag(payload.tag_id, payload.note_id);
  } catch (error) {
    throw new Error();
  }
}

async function deleteTagFromNote(note_id, tag_id) {
  try {
    await db.deleteTagFromNote(note_id, tag_id);
  } catch (error) {
    throw new Error();
  }
}

async function updateTag(tag_id, tag_name, hue) {
  try {
    await db.updateTag(tag_name, tag_id, hue);
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  deleteTagFromNote,
  addNewTag,
  addExistingTag,
  updateTag,
};
