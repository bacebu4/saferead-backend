/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const db = require("../db");

async function getNote(noteId) {
  try {
    return await db.getNote(noteId);
  } catch (error) {
    throw new Error("Error getting note");
  }
}

async function getRandomNotes(notesToChooseFrom, amount) {
  const markAsSeenQueue = [];

  const usedIndexes = new Set();

  for (let i = 0; i < amount; i += 1) {
    let repeatedIndex = true;
    let newRandomIndex;

    while (repeatedIndex) {
      newRandomIndex = Math.floor(Math.random() * notesToChooseFrom.length);

      if (!usedIndexes.has(newRandomIndex)) {
        repeatedIndex = false;
        usedIndexes.add(newRandomIndex);
        markAsSeenQueue.push(
          db.markAsSeen(notesToChooseFrom[newRandomIndex].note_id),
        );
      }
    }
  }

  await Promise.all(markAsSeenQueue);

  const newData = [];

  usedIndexes.forEach((i) => {
    newData.push(notesToChooseFrom[i]);
  });

  return newData;
}

async function generateAndGetDailyNotes(userId) {
  const amount = await db.getAmount(userId);
  let unseenNotes = await db.getNotes(userId);

  if (unseenNotes.length < amount) {
    await db.resetSeenFlag(userId);
    unseenNotes = await db.getNotes(userId);
  }

  const randomNotes = await getRandomNotes(unseenNotes, amount);
  await db.addDailyNotes(randomNotes, userId);
  return randomNotes;
}

async function getDailyNotes(userId) {
  const data = await db.getDailyNotes(userId);

  if (data.length) {
    const noteQueue = [];

    for (const note of data) {
      noteQueue.push(getNote(note.noteId));
    }
    const dailyNotes = await Promise.all(noteQueue);

    return dailyNotes.map(([n]) => n);
  }

  const dailyNotes = await generateAndGetDailyNotes(userId);
  return dailyNotes;
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
  getNotes: generateAndGetDailyNotes,
  getNotesWithTags,
  searchNotes,
  deleteNote,
  updateNote,
  getNotesWithComments,
  getNotesByBook,
  getNote,
  getNotesByTag,
  getDailyNotes,
};
