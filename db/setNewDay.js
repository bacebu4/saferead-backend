import { manager } from "./index";

const setNewDay = async () => {
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
