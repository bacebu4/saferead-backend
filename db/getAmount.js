import { manager } from "./index";

const getAmount = async (id) => {
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
