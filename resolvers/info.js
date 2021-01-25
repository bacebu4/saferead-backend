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

        let daysPast = differenceInCalendarDays(
          Date.now(),
          new Date(data.latestReviewDate).getTime(),
        );

        let streak =
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
            streak = streak + 1;
            break;

          default:
            reviewed = false;
            if (daysPast > 1000) {
              missed = 0;
              daysPast = 0;
            } else {
              missed = daysPast - 1;
            }
            break;
        }

        return {
          ...data,
          streak,
          missed,
          reviewed,
          id: userId,
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
