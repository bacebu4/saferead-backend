/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const db = require("../db");

async function getNote(note_id) {
  try {
    const note = await db.getNote(note_id);
    return note;
  } catch (error) {
    throw new Error("Error getting note");
  }
}

async function getRandomNotes(data, amount) {
  const markAsSeenQueue = [];

  // fallback when amount of notes less than needed amount
  if (data.length <= amount) {
    for (let i = 0; i < data.length; i += 1) {
      markAsSeenQueue.push(db.markAsSeen(data[i].note_id));
    }
    await Promise.all(markAsSeenQueue);
    return data;
  }

  const usedIndexes = new Set();

  for (let i = 0; i < amount; i += 1) {
    let repeatedIndex = true;
    let newRandomIndex;
    while (repeatedIndex) {
      newRandomIndex = Math.floor(Math.random() * data.length);
      if (!usedIndexes.has(newRandomIndex)) {
        repeatedIndex = false;
        usedIndexes.add(newRandomIndex);
        markAsSeenQueue.push(db.markAsSeen(data[newRandomIndex].note_id));
      }
    }
  }

  await Promise.all(markAsSeenQueue);

  const newData = [];

  usedIndexes.forEach((i) => {
    newData.push(data[i]);
  });

  return newData;
}

async function getNotes(id) {
  const amount = await db.getAmount(id);
  let data = await db.getNotes(id);
  if (data.length < amount) {
    await db.resetSeenFlag(id);
    data = await db.getNotes(id);
  }

  const randomNotes = await getRandomNotes(data, amount);
  await db.addDailyNotes(randomNotes, id);
  return randomNotes;
}

async function getDailyNotes(userId) {
  const data = await db.getDailyNotes(userId);
  if (data.length) {
    const noteQueue = [];
    for (const note of data) {
      noteQueue.push(getNote(note.noteId));
    }
    let dailyNotes = await Promise.all(noteQueue);
    dailyNotes = dailyNotes.map((n) => n[0]);
    return dailyNotes;
  }
  const dailyNotes = await getNotes(userId);
  return dailyNotes;
}

async function getNotesWithTags(notes) {
  const noteWithTags = [...notes];
  const tagQueue = [];
  notes.forEach((note) => {
    tagQueue.push(db.getTagNotes(note.note_id));
  });
  const tags = await Promise.all(tagQueue);
  tags.forEach((t, i) => {
    noteWithTags[i].tags = t;
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
  tags.forEach((t, i) => {
    noteWithComments[i].comments = t;
  });

  return noteWithComments;
}

async function searchNotes(id, substring) {
  try {
    const notes = await db.searchNotes(id, substring);
    // const notesSecond = await db.searchNotes(id, substring.toLowerCase());

    return notes;
  } catch (error) {
    throw new Error();
  }
}

async function deleteNote(id) {
  try {
    await db.deleteNote(id);
  } catch (error) {
    throw new Error("Error deleting note");
  }
}

async function updateNote(note_id, note_text) {
  try {
    await db.updateNote(note_id, note_text);
  } catch (error) {
    throw new Error("Error updating note");
  }
}

async function getNotesByBook(user_id, book_id) {
  try {
    const notes = await db.getNotesByBook(user_id, book_id);
    return notes;
  } catch (error) {
    throw new Error("Error getting notes");
  }
}

async function getNotesByTag(user_id, tag_id) {
  try {
    const notes = await db.getNotesByTag(user_id, tag_id);
    return notes;
  } catch (error) {
    throw new Error("Error getting notes");
  }
}

module.exports = {
  getNotes,
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
