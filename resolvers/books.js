const { booksService } = require("../services");
const { bookReducer } = require("../reducers");

const booksResolver = {
  Query: {
    books: async () => {
      const data = await booksService.getAllBooks(
        "57345d46-af1e-49a8-9f37-a2570a4f381d",
      );
      console.log("got");
      return data.map((b) => bookReducer(b));
    },
  },
};

module.exports = booksResolver;
