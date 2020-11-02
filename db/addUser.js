import { manager } from "./index";

const addUser = async (id, email, hashUid) => {
  const data = await manager.query(
    /* sql */ `
    insert into 
    users(user_id, review_amount, streak, missed, current, reviewed, createdAt, email, uid) 
    VALUES ($1, 3, 0, 0, 0, false, now(), $2, $3)
  `,
    [id, email, hashUid],
  );

  return data;
};

module.exports = {
  addUser,
};
