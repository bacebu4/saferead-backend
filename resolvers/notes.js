const { notesService } = require("../services");
const { noteReducer } = require("../reducers");

const notesResolver = {
  Query: {
    dailyNotes: async (_, __, { userId }) => {
      if (!userId) {
        return [];
      }
      const data = await notesService.getNotes(userId);
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