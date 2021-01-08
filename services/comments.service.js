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

async function updateComment(comment_id, comment_text) {
  try {
    await db.updateComment(comment_id, comment_text);
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

async function addComment(note_id, comment_id, comment_text) {
  try {
    await db.addComment(note_id, comment_id, comment_text);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding comment");
  }
}

async function deleteComment(comment_id) {
  try {
    await db.deleteComment(comment_id);
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
