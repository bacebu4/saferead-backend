const { getConnection } = require("typeorm");

const markAsSeen = async (id) => {
  const manager = await getConnection();
  await manager.query(
    /* sql */ `
    update notes
    set current_value = current_value - 1
    where note_id = $1;
  `,
    [id],
  );
};

module.exports = {
  markAsSeen,
};
