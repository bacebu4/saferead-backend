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

async function addNewTag(userId, tagId, noteId, name, hue) {
  try {
    await db.addNewTag(userId, tagId, noteId, name, hue);
    await db.addExistingTag(tagId, noteId);
    await db.increaseNoteValue(noteId);
  } catch (error) {
    throw new Error();
  }
}

async function deleteTagFromNote(noteId, tagId) {
  try {
    await db.deleteTagFromNote(noteId, tagId);
    await db.decreaseNoteValue(noteId);
  } catch (error) {
    throw new Error();
  }
}

async function deleteTag(tagId) {
  try {
    await db.deleteTag(tagId);
  } catch (error) {
    throw new Error();
  }
}

async function updateTag(tagId, name, hue) {
  try {
    await db.updateTag(name, tagId, hue);
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
