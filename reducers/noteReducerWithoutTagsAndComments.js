const noteReducerWithoutTagsAndComments = (note) => ({
  id: note.note_id,
  text: note.note_text,
  title: note.book_title,
  deleted: false,
  author: note.author_full_name,
});

module.exports = noteReducerWithoutTagsAndComments;
