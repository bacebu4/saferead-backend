const commentReducer = (comment) => ({
  id: comment.comment_id,
  text: comment.comment_text,
  createdAt: comment.createdat,
  noteId: comment.note_id,
});

module.exports = commentReducer;
