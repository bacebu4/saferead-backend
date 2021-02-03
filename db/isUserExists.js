const { getConnection } = require("typeorm");

const isUserExists = async (userId) => {
  const manager = await getConnection();

  const [data] = await manager.query(
    /* sql */ `
    select user_id
    from users
    where user_id = $1;
  `,
    [userId],
  );

  if (data && data.user_id) {
    return true;
  }
  return false;
};

module.exports = {
  isUserExists,
};
