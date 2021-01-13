const { infoService } = require("../services");

const infoResolver = {
  Query: {
    info: async (_, __, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }
        const data = await infoService.getInfo(userId);
        return data;
      } catch (error) {
        return {};
      }
    },
  },
  Mutation: {
    updateReviewHistory: async (_, { date }, { userId }) => {
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
