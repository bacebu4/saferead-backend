const { getConnection } = require("typeorm");

const updateReviewHistory = async (userId, date) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    insert into review_history 
    ("userId", date) 
    VALUES ($1, $2);
  `,
    [userId, date],
  );
};

module.exports = {
  updateReviewHistory,
};
