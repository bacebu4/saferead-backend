const { getConnection } = require("typeorm");

const resetSeenFlag = async (id) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    update notes
    set seen = false
    where user_id = $1;
  `,
    [id],
  );
};

module.exports = {
  resetSeenFlag,
};
