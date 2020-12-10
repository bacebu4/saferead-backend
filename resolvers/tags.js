/* eslint-disable object-curly-newline */
const { tagsService } = require("../services");

const tagsResolver = {
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
  },
};

module.exports = tagsResolver;
