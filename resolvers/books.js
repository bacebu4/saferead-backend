const { booksService } = require("../services");
const { bookReducer } = require("../reducers");

const booksResolver = {
  Query: {
    books: async (_, __, context) => {
      console.log("got");
      console.log("context.userId", context.userId);
      if (!context.userId) {
        return [];
      }
      const data = await booksService.getAllBooks(context.userId);
      console.log("data", data);
      return data.map((b) => bookReducer(b));
    },
  },
};

module.exports = booksResolver;
