const { notesService } = require("../services");

const getDailyNotes = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const notes = await notesService.getNotes(req.user.id);
  const notesWithTags = await notesService.getNotesWithTags(notes);
  res.json(notesWithTags);
};

const searchNotes = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const notes = await notesService.searchNotes(
      req.user.id,
      req.body.substring,
    );
    res.json(notes);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getDailyNotes,
  searchNotes,
};
