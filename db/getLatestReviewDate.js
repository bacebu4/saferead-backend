const { getConnection } = require("typeorm");

const getLatestReviewDate = async (userId) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
      select date
      from review_history
      where "userId" = $1
      order by date desc
      limit 1;
  `,
    [userId],
  );

  if (raw.length) {
    return raw[0].date;
  }
  return null;
};

module.exports = {
  getLatestReviewDate,
};
