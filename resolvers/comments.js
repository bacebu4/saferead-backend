/* eslint-disable object-curly-newline */

const { commentsService } = require("../services");

const commentsResolver = {
  Mutation: {
    addComment: async (_, { noteId, commentId, text }, { userId }) => {
      try {
        if (!userId) {
          return false;
        }
        console.log("noteId", noteId);
        console.log("commentId", commentId);
        console.log("text", text);
        await commentsService.addComment(noteId, commentId, text);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

module.exports = commentsResolver;
