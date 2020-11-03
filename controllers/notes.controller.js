const { notesService } = require("../services");

const getDailyNotes = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const notes = await notesService.getNotes(req.user.id);
  const notesWithTags = await notesService.getNotesWithTags(notes);
  res.json(notesWithTags);
};

module.exports = {
  getDailyNotes,
};
