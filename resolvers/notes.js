const { notesService } = require("../services");
const { noteReducer } = require("../reducers");

const notesResolver = {
  Query: {
    dailyNotesIds: async (_, __, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }
        const data = await notesService.getDailyNotes(userId);
        if (!data.length) {
          throw new Error();
        }

        return data;
      } catch (error) {
        return [""];
      }
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
    searchNotes: async (_, { substring }, { userId }) => {
      try {
        const notes = await notesService.searchNotes(userId, substring);
        return notes.map((n) => noteReducer(n));
      } catch (error) {
        return [];
      }
    },
  },
};

module.exports = notesResolver;
