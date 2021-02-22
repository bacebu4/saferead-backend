const { tagReducer } = require("../reducers");
const { tagsService } = require("../services");

const tagsResolver = {
  Query: {
    tags: async (_, { type }, { userId }) => {
      if (!userId) {
        return [];
      }

      let data;
      if (type === "latest") {
        data = await tagsService.getLatestTags(userId);
        console.log(data);
      } else {
        data = await tagsService.getAllTags(userId);
      }

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
    updateTag: async (_, { tagId, name, hue }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await tagsService.updateTag(tagId, name, hue);

        return true;
      } catch (error) {
        return false;
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
    deleteTag: async (_, { tagId }, { userId }) => {
      try {
        if (!userId) {
          throw new Error();
        }

        await tagsService.deleteTag(tagId);

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

module.exports = tagsResolver;
