import { manager } from "./index";

const getAccountInfo = async (id) => {
  const raw = await manager.query(
    /* sql */ `
    select *
    from users
    where user_id = $1
  `,
    [id],
  );
  return raw;
};

module.exports = {
  getAccountInfo,
};
