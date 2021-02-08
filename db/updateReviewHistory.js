const { getConnection } = require("typeorm");

const updateReviewHistory = async (userId) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    insert into review_history 
    VALUES (now(), $1);
  `,
    [userId],
  );
};

module.exports = {
  updateReviewHistory,
};
