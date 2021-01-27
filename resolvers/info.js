const { infoReducer } = require("../reducers");
const { infoService } = require("../services");

const infoResolver = {
  Query: {
    info: async (_, __, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }
        const data = await infoService.getInfo(userId);

        return infoReducer(data, userId);
      } catch (error) {
        return {};
      }
    },
  },
  Mutation: {
    updateReviewHistory: async (_, { date }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await infoService.updateReviewHistory(userId, date);
        return true;
      } catch (__) {
        return false;
      }
    },
    updateReviewAmount: async (_, { reviewAmount }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await infoService.updateReviewAmount(userId, reviewAmount);

        const data = await infoService.getInfo(userId);

        return infoReducer(data, userId);
      } catch (__) {
        return {};
      }
    },
  },
};

module.exports = infoResolver;
