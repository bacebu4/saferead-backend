import { manager } from './index';

const markAsSeen = async (id) => {
  await manager.query(/* sql */`
    update notes
    set seen = true
    where note_id = $1;
  `, [id]);
};

module.exports = {
  markAsSeen,
};
