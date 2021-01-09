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
    addNewTag: async (_, { name, hue, id, noteId }) => {
      const body = {
        tag_id: id,
        tag_name: name,
        hue,
        note_id: noteId,
      };

      await tagsService.addNewTag("57345d46-af1e-49a8-9f37-a2570a4f381d", body);

      return true;
    },
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
  },
};

module.exports = tagsResolver;
