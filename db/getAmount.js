const { getConnection } = require("typeorm");

const getAmount = async (id) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select review_amount
    from users
    where users.user_id = $1
  `,
    [id],
  );
  return raw[0].review_amount;
};

module.exports = {
  getAmount,
};
