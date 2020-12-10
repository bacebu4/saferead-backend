const commentReducer = require("./commentReducer");
const tagReducer = require("./tagReducer");

const noteReducer = (note) => ({
  id: note.note_id,
  text: note.note_text,
  title: note.book_title,
  deleted: note.deleted,
  author: note.author_full_name,
  comments: note.comments.map((c) => commentReducer(c)) || [],
  tags: note.tags.map((t) => tagReducer(t)) || [],
});

module.exports = noteReducer;
