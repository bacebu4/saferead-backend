const { getConnection } = require("typeorm");

const increaseNoteValue = async (noteId) => {
  const manager = await getConnection();

  await manager.query(
    /* sql */ `
    UPDATE
      notes
    SET
      current_value = initial_value + 1,
      initial_value = initial_value + 1
    WHERE
      note_id = $1;
  `,
    [noteId],
  );
};

module.exports = {
  increaseNoteValue,
};
