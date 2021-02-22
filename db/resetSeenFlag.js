const { getConnection } = require("typeorm");

const resetSeenFlag = async (userId) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    update notes
    set current_value = initial_value
    where user_id = $1;
  `,
    [userId],
  );
};

module.exports = {
  resetSeenFlag,
};
