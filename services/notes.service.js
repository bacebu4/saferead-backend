const db = require('../db');

function markAsSeen(noteId) {

}

function getRandomNotes(data, amount) {
  if (data.length <= amount) {
    return data;
  }

  const usedIndexes = new Set();

  for (let i = 0; i < amount; i += 1) {
    let repeatedIndex = true;
    let newRandomIndex;

    while (repeatedIndex) {
      newRandomIndex = Math.floor(Math.random() * (amount + 1));
      if (!usedIndexes.has(newRandomIndex)) {
        repeatedIndex = false;
        usedIndexes.add(newRandomIndex);
      }
    }
  }

  const newData = [];

  usedIndexes.forEach((i) => {
    newData.push(data[i]);
  });

  return newData;
}

async function getNotes(id, amount) {
  const data = await db.getNotes(id);
  const randomNotes = getRandomNotes(data, amount);
  return randomNotes;
}

module.exports = {
  getNotes,
};
