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
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  updateComment,
};
