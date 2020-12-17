const { getConnection } = require("typeorm");

const updateReviewHistory = async (userId, date) => {
  const manager = await getConnection();
  console.log("and here");
  await manager.query(
    /* sql */ `
    insert into review_history 
    VALUES ($2, $1);
  `,
    [userId, date],
  );
};

module.exports = {
  updateReviewHistory,
};
