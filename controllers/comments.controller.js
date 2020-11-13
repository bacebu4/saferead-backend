const { commentsService } = require("../services");

const updateComment = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await commentsService.updateComment(
      req.body.comment_id,
      req.body.comment_text,
    );
    res.status(204).send("Successfully updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addComment = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await commentsService.addComment(
      req.body.note_id,
      req.body.comment_id,
      req.body.comment_text,
    );
    res.status(201).send("Successfully added");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addComment,
  updateComment,
};
