function getNotesWithUpperBound(notes) {
  return notes.map((note, index, array) => {
    if (index !== 0) {
      const prevNote = array[index - 1];
      const prevUpperBound = prevNote.upperBound;
      note.upperBound = prevUpperBound + note.current_value;
      return note;
    }
    note.upperBound = note.current_value;
    return note;
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumAllNotesValues(notes) {
  let value = 0;

  for (const note of notes) {
    value += note.current_value;
  }

  return value;
}

function getRandomNoteId(notes) {
  const notesWithUpperBound = getNotesWithUpperBound(notes);
  const allNotesValue = sumAllNotesValues(notesWithUpperBound);
  const randomValue = getRandomInt(0, allNotesValue - 1);

  for (const note of notesWithUpperBound) {
    if (randomValue < note.upperBound) {
      return note.note_id;
    }
  }
}

module.exports = {
  getRandomNoteId,
};
