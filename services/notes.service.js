/* eslint-disable camelcase */
const db = require("../db");
const { getRandomNotesIds } = require("../utils/random.util");

async function getNote(noteId) {
  try {
    return await db.getNote(noteId);
  } catch (error) {
    throw new Error("Error getting note");
  }
}

async function generateAndGetDailyNotesIds(userId) {
  const amount = await db.getAmount(userId);
  let unseenNotes = await db.getNotes(userId);

  if (unseenNotes.length < amount) {
    await db.resetSeenFlag(userId);
    unseenNotes = await db.getNotes(userId);
  }

  const randomNotesIds = await getRandomNotesIds(unseenNotes, amount);

  markAsSeenQueue = [];
  randomNotesIds.forEach((noteId) => {
    markAsSeenQueue.push(db.markAsSeen(noteId));
  });
  await Promise.all(markAsSeenQueue);
  await db.addDailyNotes(randomNotesIds, userId);

  return randomNotesIds;
}

async function getDailyNotesIds(userId) {
  const generatedDailyNotesIds = await db.getDailyNotes(userId);

  if (generatedDailyNotesIds && generatedDailyNotesIds.length) {
    return generatedDailyNotesIds.map((note) => note.noteId);
  }

  return await generateAndGetDailyNotesIds(userId);
}

async function getNotesWithTags(notes) {
  const noteWithTags = [...notes];
  const tagQueue = [];

  notes.forEach((note) => {
    tagQueue.push(db.getTagNotes(note.note_id));
  });

  const tags = await Promise.all(tagQueue);

  tags.forEach((tag, i) => {
    noteWithTags[i].tags = tag;
    noteWithTags[i].deleted = false;
  });

  return noteWithTags;
}

async function getNotesWithComments(notes) {
  const noteWithComments = [...notes];

  const tagQueue = [];

  notes.forEach((note) => {
    tagQueue.push(db.getCommentNotes(note.note_id));
  });

  const tags = await Promise.all(tagQueue);

  tags.forEach((tag, i) => {
    noteWithComments[i].comments = tag;
  });

  return noteWithComments;
}

async function searchNotes(userId, substring) {
  try {
    return await db.searchNotes(userId, substring);
  } catch (error) {
    throw new Error();
  }
}

async function deleteNote(noteId) {
  try {
    await db.deleteNote(noteId);
  } catch (error) {
    throw new Error("Error deleting note");
  }
}

async function updateNote(noteId, noteText) {
  try {
    await db.updateNote(noteId, noteText);
  } catch (error) {
    throw new Error("Error updating note");
  }
}

async function getNotesByBook(userId, bookId) {
  try {
    return await db.getNotesByBook(userId, bookId);
  } catch (error) {
    throw new Error("Error getting notes");
  }
}

async function getNotesByTag(userId, tagId) {
  try {
    return await db.getNotesByTag(userId, tagId);
  } catch (error) {
    throw new Error("Error getting notes");
  }
}

module.exports = {
  getNotesWithTags,
  searchNotes,
  deleteNote,
  updateNote,
  getNotesWithComments,
  getNotesByBook,
  getNote,
  getNotesByTag,
  getDailyNotes: getDailyNotesIds,
};
