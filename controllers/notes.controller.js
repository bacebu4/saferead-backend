const { notesService } = require("../services");

const getDailyNotes = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const notes = await notesService.getNotes(req.user.id);
  const notesWithTags = await notesService.getNotesWithTags(notes);
  const notesWithComments = await notesService.getNotesWithComments(
    notesWithTags,
  );
  res.json(notesWithComments);
};

const getNotesByBook = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const notes = await notesService.getNotesByBook(
    req.user.id,
    req.body.book_id,
  );
  res.json(notes);
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

const deleteNote = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await notesService.deleteNote(req.body.id);
    res.status(204).send("Successfully deleted");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const updateNote = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await notesService.updateNote(req.body.note_id, req.body.note_text);
    res.status(204).send("Successfully updated");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getDailyNotes,
  searchNotes,
  deleteNote,
  updateNote,
  getNotesByBook,
};
