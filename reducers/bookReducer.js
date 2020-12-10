const bookReducer = (book) => ({
  title: book.book_title,
  author: book.author_full_name,
  id: book.book_id,
});

module.exports = bookReducer;
