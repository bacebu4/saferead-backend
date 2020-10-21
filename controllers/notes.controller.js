const { notesService } = require('../services');

const getDailyNotes = async (_, res) => {
  const notes = await notesService.getNotes('1', 3);
  res.json(notes);
};

module.exports = {
  getDailyNotes,
};
