/* eslint-disable object-curly-newline */
const { tagReducer } = require("../reducers");
const { tagsService } = require("../services");

const tagsResolver = {
  Query: {
    latestTags: async (_, __, { userId }) => {
      if (!userId) {
        return [];
      }
      const data = await tagsService.getLatestTags(userId);
      return data.map((n) => tagReducer(n));
    },
    tags: async (_, __, { userId }) => {
      if (!userId) {
        return [];
      }
      const data = await tagsService.getAllTags(userId);
      return data.map((n) => tagReducer(n));
    },
  },
  Mutation: {
    addExistingTag: async (_, { noteId, tagId }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await tagsService.addExistingTag(tagId, noteId);
        const tags = await tagsService.getTagNotes(noteId);

        return {
          id: noteId,
          tags: tags.map((n) => tagReducer(n)),
        };
      } catch (error) {
        return {};
      }
    },
    addNewTag: async (_, { noteId, tagId, name, hue }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await tagsService.addNewTag(userId, tagId, noteId, name, hue);
        const tags = await tagsService.getTagNotes(noteId);

        return {
          id: noteId,
          tags: tags.map((n) => tagReducer(n)),
        };
      } catch (error) {
        return {};
      }
    },
    deleteTagFromNote: async (_, { noteId, tagId }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await tagsService.deleteTagFromNote(noteId, tagId);
        const tags = await tagsService.getTagNotes(noteId);

        return {
          id: noteId,
          tags: tags.map((n) => tagReducer(n)),
        };
      } catch (error) {
        return {};
      }
    },
  },
};

module.exports = tagsResolver;
