/* eslint-disable camelcase */
const db = require("../db");

async function getCommentNotes(noteId) {
  try {
    const data = await db.getCommentNotes(noteId);
    return data;
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

async function getNoteIdByCommentId(commentId) {
  try {
    const data = await db.getNoteIdByCommentId(commentId);
    return data;
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

async function updateComment(commentId, commentText) {
  try {
    await db.updateComment(commentId, commentText);
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

async function addComment(noteId, commentId, commentText) {
  try {
    await db.addComment(noteId, commentId, commentText);
    await db.increaseNoteValue(noteId);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding comment");
  }
}

async function deleteComment(commentId, noteId) {
  try {
    await db.deleteComment(commentId);
    await db.decreaseNoteValue(noteId);
  } catch (error) {
    throw new Error("Error deleting comment");
  }
}

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getCommentNotes,
  getNoteIdByCommentId,
};
