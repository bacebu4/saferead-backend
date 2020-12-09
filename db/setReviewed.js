const { getConnection } = require("typeorm");

const setReviewed = async (id) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
  update users
    set reviewed = true, 
        streak = streak + 1, 
        missed = 0
    where user_id = $1;
  `,
    [id],
  );
};

module.exports = {
  setReviewed,
};
