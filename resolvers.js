/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  Query: {
    hello: () => "hey man",
    notes: (_, __, { notesService }) =>
      notesService.getNotes("57345d46-af1e-49a8-9f37-a2570a4f381d"),
  },
};
