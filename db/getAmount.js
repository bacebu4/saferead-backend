const { getConnection } = require("typeorm");

const getAmount = async (id) => {
  const manager = await getConnection();
  const [data] = await manager.query(
    /* sql */ `
    select review_amount
    from users
    where users.user_id = $1
  `,
    [id],
  );

  if (data && data.review_amount) {
    return data.review_amount;
  } else {
    throw new Error();
  }
};

module.exports = {
  getAmount,
};
