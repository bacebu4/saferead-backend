/* eslint-disable object-curly-newline */

const { commentReducer } = require("../reducers");
const { commentsService } = require("../services");

const commentsResolver = {
  Mutation: {
    addComment: async (_, { noteId, commentId, text }, { userId }) => {
      try {
        if (!userId) {
          return {};
        }
        await commentsService.addComment(noteId, commentId, text);
        const comments = await commentsService.getCommentNotes(noteId);
        const reducedComments = comments.map((c) => commentReducer(c));
        return {
          id: noteId,
          comments: reducedComments,
        };
      } catch (error) {
        return {};
      }
    },
  },
};

module.exports = commentsResolver;
