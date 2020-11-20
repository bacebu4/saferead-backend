import { manager } from "./index";

const setReviewed = async (id) => {
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
