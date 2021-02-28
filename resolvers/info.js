const { infoReducer } = require("../reducers");
const { infoService } = require("../services");
const { GraphQLScalarType, Kind } = require("graphql");

const infoResolver = {
  Query: {
    info: async (_, __, { userId }) => {
      try {
        const data = await infoService.getInfo(userId);

        return infoReducer(data, userId);
      } catch (error) {
        throw new Error("invalid user");
      }
    },
    reviewHistoryThisWeek: async (_, __, { userId }) => {
      try {
        const data = await infoService.getReviewHistoryThisWeek(userId);
        return data;
      } catch (error) {
        return {};
      }
    },
  },
  Mutation: {
    updateReviewHistory: async (_, __, { userId }) => {
      try {
        await infoService.updateReviewHistory(userId);

        const data = await infoService.getInfo(userId);

        return infoReducer(data, userId);
      } catch (__) {
        return {};
      }
    },
    updateReviewAmount: async (_, { reviewAmount }, { userId }) => {
      try {
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
