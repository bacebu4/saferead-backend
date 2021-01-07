const { getConnection } = require("typeorm");

const getStreakBeginning = async (userId) => {
  const manager = await getConnection();
  const raw = await manager.query(
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
  return raw[0].date;
};

module.exports = {
  getStreakBeginning,
};
