/* eslint-disable operator-linebreak */
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");

const { infoService } = require("../services");

const infoResolver = {
  Query: {
    info: async (_, __, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }
        const data = await infoService.getInfo(userId);

        const daysPast = differenceInCalendarDays(
          Date.now(),
          new Date(data.latestReviewDate).getTime(),
        );

        const streak =
          differenceInCalendarDays(
            new Date(data.latestReviewDate).getTime(),
            new Date(data.streakBeginningDate).getTime(),
          ) + 1;

        let missed = 0;
        let reviewed;

        switch (daysPast) {
          case 0:
            reviewed = true;
            break;

          case 1:
            reviewed = false;
            break;

          default:
            reviewed = false;
            missed = daysPast - 1;
            break;
        }
        return {
          ...data,
          streak,
          missed,
          reviewed,
        };
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
