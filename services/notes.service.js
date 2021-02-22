/* eslint-disable camelcase */
const db = require("../db");
const { getRandomNoteId } = require("../utils/random.util");

async function getNote(noteId) {
  try {
    return await db.getNote(noteId);
  } catch (error) {
    throw new Error("Error getting note");
  }
}

async function getRandomNotesIds(notesToChooseFrom, amount) {
  const markAsSeenQueue = [];

  // fallback when overall amount of notes less than needed amount
  if (notesToChooseFrom.length <= amount) {
    for (let i = 0; i < notesToChooseFrom.length; i += 1) {
      markAsSeenQueue.push(db.markAsSeen(notesToChooseFrom[i].note_id));
    }
    await Promise.all(markAsSeenQueue);
    return notesToChooseFrom.map((n) => n.note_id);
  }

  const usedIds = [];

  for (let i = 0; i < amount; i += 1) {
    const newRandomId = getRandomNoteId(notesToChooseFrom);
    console.log("newRandomId", newRandomId);
    usedIds.push(newRandomId);
    markAsSeenQueue.push(db.markAsSeen(newRandomId));
    notesToChooseFrom = notesToChooseFrom.filter(
      (note) => note.note_id !== newRandomId,
    );
  }

  await Promise.all(markAsSeenQueue);
  return usedIds;
}

async function generateAndGetDailyNotesIds(userId) {
  const amount = await db.getAmount(userId);
  let unseenNotes = await db.getNotes(userId);
  console.log("unseen notes length = ", unseenNotes.length);

  if (unseenNotes.length < amount) {
    console.log("resetting");
    await db.resetSeenFlag(userId);
    unseenNotes = await db.getNotes(userId);
    console.log("unseen notes new length = ", unseenNotes.length);
  }

  const randomNotesIds = await getRandomNotesIds(unseenNotes, amount);
  console.log("random notes length = ", randomNotesIds.length);
  await db.addDailyNotes(randomNotesIds, userId);
  return randomNotesIds;
}

async function getDailyNotesIds(userId) {
  const data = await db.getDailyNotes(userId);

  if (data && data.length) {
    return data.map((el) => el.noteId);
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
  getNotes: generateAndGetDailyNotesIds,
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
