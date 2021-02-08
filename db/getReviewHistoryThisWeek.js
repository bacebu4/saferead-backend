const { getDay } = require("date-fns");
const { getConnection } = require("typeorm");

const getReviewHistoryThisWeek = async (userId) => {
  const manager = await getConnection();

  const currentDate = new Date();

  let dayOfWeekNumber = getDay(currentDate) - 1;

  if (dayOfWeekNumber === -1) {
    dayOfWeekNumber = 6;
  }

  const data = await manager.query(
    /* sql */ `
    select date, days_diff from (
      select *, daterange_subdiff($3, date) as days_diff
      from review_history
      where "userId" = $1
    ) as x
    where days_diff <= $2
  `,
    [userId, dayOfWeekNumber, currentDate],
  );

  if (data && data.length) {
    return data.map((record) => record.date);
  }

  return [];
};

module.exports = {
  getReviewHistoryThisWeek,
};
