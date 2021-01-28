const { getConnection } = require("typeorm");

const getLatestReviewDate = async (userId) => {
  const manager = await getConnection();

  const [data] = await manager.query(
    /* sql */ `
      select date
      from review_history
      where "userId" = $1
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
  getLatestReviewDate,
};
