const { getConnection } = require("typeorm");

const addUser = async (id, email, password) => {
  const manager = await getConnection();
  const data = await manager.query(
    /* sql */ `
    insert into 
    users(user_id, review_amount, streak, missed, current, reviewed, createdAt, email, password) 
    VALUES ($1, 3, 0, 0, 0, false, now(), $2, $3)
  `,
    [id, email, password],
  );

  return data;
};

module.exports = {
  addUser,
};
