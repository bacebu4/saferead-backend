/* eslint-disable camelcase */
const db = require("../db");

async function updateComment(comment_id, comment_text) {
  try {
    await db.updateComment(comment_id, comment_text);
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

module.exports = {
  updateComment,
};
