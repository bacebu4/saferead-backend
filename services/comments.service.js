/* eslint-disable camelcase */
const db = require("../db");

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
    throw new Error("Error adding comment");
  }
}

module.exports = {
  addComment,
  updateComment,
};
