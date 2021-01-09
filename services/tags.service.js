/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function addExistingTag(tagId, noteId) {
  try {
    await db.addExistingTag(tagId, noteId);
  } catch (error) {
    throw new Error();
  }
}

async function getLatestTags(userId) {
  try {
    const data = await db.getLatestTags(userId);
    return data;
  } catch (error) {
    throw new Error();
  }
}

async function getAllTags(userId) {
  try {
    const data = await db.getAllTags(userId);
    return data;
  } catch (error) {
    throw new Error();
  }
}

async function getTagNotes(noteId) {
  try {
    const data = await db.getTagNotes(noteId);
    return data;
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

async function deleteTag(tag_id) {
  try {
    await db.deleteTag(tag_id);
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
  deleteTag,
  getLatestTags,
  getAllTags,
  getTagNotes,
};
