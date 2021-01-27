const { getConnection } = require("typeorm");

const updateReviewAmount = async (userId, reviewAmount) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    update users
    set review_amount = $2
    where user_id = $1
  `,
    [userId, reviewAmount],
  );
};

module.exports = {
  updateReviewAmount,
};
