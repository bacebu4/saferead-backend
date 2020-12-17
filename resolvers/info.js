const { infoService } = require("../services");
const { tagReducer, bookReducer, accountInfoReducer } = require("../reducers");

const infoResolver = {
  Query: {
    initInfo: async () => {
      const data = await infoService.getInitInfo(
        "57345d46-af1e-49a8-9f37-a2570a4f381d",
      );
      return {
        tags: data.tags.map((t) => tagReducer(t)),
        latestBooks: data.latestBooks.map((b) => bookReducer(b)),
        accountInfo: accountInfoReducer(data.accountInfo),
      };
    },
  },
  Mutation: {
    updateReviewHistory: async (_, { date }, { userId }) => {
      console.log("got mutation");
      console.log(date);
      console.log(userId);
      if (!userId) {
        return true;
      }
      try {
        await infoService.updateReviewHistory(userId, date);
        return true;
      } catch (__) {
        return false;
      }
    },
  },
};

module.exports = infoResolver;
