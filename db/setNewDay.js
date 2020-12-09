const { getConnection } = require("typeorm");

const setNewDay = async () => {
  const manager = await getConnection();
  await manager.query(/* sql */ `
    update users
    set streak = 0,
        missed = missed + 1
    where reviewed = false;
  `);
  await manager.query(/* sql */ `
    update users
    set reviewed = true
    where reviewed = false;
  `);
};

module.exports = {
  setNewDay,
};
