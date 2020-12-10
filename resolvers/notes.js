const { notesService } = require("../services");
const { noteReducer } = require("../reducers");

const notesResolver = {
  Query: {
    dailyNotes: async () => {
      const data = await notesService.getNotes(
        "57345d46-af1e-49a8-9f37-a2570a4f381d",
      );
      const notesWithTags = await notesService.getNotesWithTags(data);
      const notesWithComments = await notesService.getNotesWithComments(
        notesWithTags,
      );
      return notesWithComments.map((n) => noteReducer(n));
    },

    note: async (_, { id }) => {
      const data = await notesService.getNote(id);
      const notesWithTags = await notesService.getNotesWithTags(data);
      const notesWithComments = await notesService.getNotesWithComments(
        notesWithTags,
      );
      return noteReducer(notesWithComments[0]);
    },
  },
};

module.exports = notesResolver;
