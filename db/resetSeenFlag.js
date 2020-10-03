import { manager } from './index';

const resetSeenFlag = async (id) => {
  await manager.query(/* sql */`
    update notes
    set seen = false
    where user_id = $1;
  `, [id]);
};

module.exports = {
  resetSeenFlag,
};
