const { notesService } = require("../services");
const {
  noteReducer,
  noteReducerWithoutTagsAndComments,
} = require("../reducers");

const notesResolver = {
  Query: {
    dailyNotes: async (_, __, { userId }) => {
      if (!userId) {
        return [];
      }
      const data = await notesService.getDailyNotes(userId);
      const notesWithTags = await notesService.getNotesWithTags(data);
      const notesWithComments = await notesService.getNotesWithComments(
        notesWithTags,
      );
      return notesWithComments.map((n) => noteReducer(n));
    },
    note: async (_, { id }, { userId }) => {
      if (!userId) {
        return {};
      }
      const data = await notesService.getNote(id);
      const notesWithTags = await notesService.getNotesWithTags(data);
      const notesWithComments = await notesService.getNotesWithComments(
        notesWithTags,
      );
      return noteReducer(notesWithComments[0]);
    },
    notesBy: async (_, { type, id }, { userId }) => {
      if (!userId) {
        return [];
      }

      let data;
      switch (type) {
        case "Book":
          data = await notesService.getNotesByBook(userId, id);
          break;
        case "Tag":
          data = await notesService.getNotesByTag(userId, id);
          break;

        default:
          data = [];
          break;
      }
      return data.map((n) => noteReducer(n));
    },
  },
  Mutation: {
    deleteNote: async (_, { noteId }) => {
      try {
        await notesService.deleteNote(noteId);
        return true;
      } catch (error) {
        return false;
      }
    },
    updateNote: async (_, { noteId, text }) => {
      try {
        await notesService.updateNote(noteId, text);
        return { id: noteId, text };
      } catch (error) {
        return false;
      }
    },
  },
};

module.exports = notesResolver;
