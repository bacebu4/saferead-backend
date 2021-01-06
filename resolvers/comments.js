/* eslint-disable object-curly-newline */

const { commentsService } = require("../services");

const commentsResolver = {
  Mutation: {
    addComment: async (_, { noteId, commentId, text }, { userId }) => {
      try {
        if (!userId) {
          return false;
        }
        await commentsService.addComment(noteId, commentId, text);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

module.exports = commentsResolver;
