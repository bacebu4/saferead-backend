/* eslint-disable operator-linebreak */
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");

const infoReducer = (data, userId) => {
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
      break;

    default:
      reviewed = false;
      streak = 0;
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
};

module.exports = infoReducer;
