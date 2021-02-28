const { tagReducer } = require("../reducers");
const { tagsService } = require("../services");

const tagsResolver = {
  Query: {
    tags: async (_, { type }, { userId }) => {
      let data;
      if (type === "latest") {
        data = await tagsService.getLatestTags(userId);
      } else {
        data = await tagsService.getAllTags(userId);
      }

      return data.map((n) => tagReducer(n));
    },
  },
  Mutation: {
    addExistingTag: async (_, { noteId, tagId }, { userId }) => {
      try {
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
    updateTag: async (_, { tagId, name, hue }) => {
      try {
        await tagsService.updateTag(tagId, name, hue);

        return true;
      } catch (error) {
        return false;
      }
    },
    deleteTagFromNote: async (_, { noteId, tagId }) => {
      try {
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
    deleteTag: async (_, { tagId }) => {
      try {
        await tagsService.deleteTag(tagId);

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

module.exports = tagsResolver;
