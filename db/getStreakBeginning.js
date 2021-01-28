const { getConnection } = require("typeorm");

const getStreakBeginning = async (userId) => {
  const manager = await getConnection();
  const [data] = await manager.query(
    /* sql */ `
    select * from (
      select date, daterange_subdiff(date, lag(date) over (order by date)) as ds
      from review_history
      where "userId" = $1
    ) as x
    where ds != 1 or ds is null
    order by date desc
    limit 1;
  `,
    [userId],
  );

  if (data && data.date) {
    return data.date;
  }
  return null;
};

module.exports = {
  getStreakBeginning,
};
