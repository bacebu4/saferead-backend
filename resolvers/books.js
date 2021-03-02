const { booksService } = require("../services");
const { bookReducer } = require("../reducers");

const booksResolver = {
  Query: {
    books: async (_, __, { userId }) => {
      const data = await booksService.getAllBooks(userId);
      return data.map((b) => bookReducer(b));
    },
    latestBooks: async (_, __, { userId }) => {
      const data = await booksService.getLatestBooks(userId);
      return data.map((b) => bookReducer(b));
    },
  },
  Mutation: {
    deleteBook: async (_, { bookId }) => {
      const data = await booksService.deleteBook(bookId);
      return true;
    },
  },
};

module.exports = booksResolver;
