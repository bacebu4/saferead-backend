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
    deleteComment: async (_, { commentId, noteId }, { userId }) => {
      try {
        if (!userId) {
          return {};
        }
        await commentsService.deleteComment(commentId, noteId);
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
    updateComment: async (_, { commentId, text }, { userId }) => {
      try {
        if (!userId) {
          return {};
        }
        await commentsService.updateComment(commentId, text);
        return {
          id: commentId,
          text,
        };
      } catch (error) {
        return {};
      }
    },
  },
};

module.exports = commentsResolver;
