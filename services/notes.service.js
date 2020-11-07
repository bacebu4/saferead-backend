const db = require("../db");

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
  return randomNotes;
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
  });
  return noteWithTags;
}

async function searchNotes(id, substring) {
  try {
    const notes = await db.searchNotes(id, substring);
    return notes;
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  getNotes,
  getNotesWithTags,
  searchNotes,
};
