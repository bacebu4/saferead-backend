const { getConnection } = require("typeorm");

const getReviewHistoryThisWeek = async (userId) => {
  const manager = await getConnection();

  const data = await manager.query(
    /* sql */ `
    select date, days_diff from (
      select *, daterange_subdiff(date(now()), date) as days_diff
      from review_history
      where "userId" = $1
    ) as x
    where days_diff < 7 - date_part('dow', now())
  `,
    [userId],
  );

  if (data && data.length) {
    return data.map((record) => record.date);
  }

  return [];
};

module.exports = {
  getReviewHistoryThisWeek,
};
