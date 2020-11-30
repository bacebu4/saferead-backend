const { booksService } = require("../services");

const deleteBook = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await booksService.deleteBook(req.body.book_id);
    res.status(204).send("Deleted book");
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
};

module.exports = {
  deleteBook,
};
