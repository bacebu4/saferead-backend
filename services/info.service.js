/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function getInitInfo(id) {
  const tags = await db.getAllTags(id);
  const allAccountInfo = await db.getAccountInfo(id);
  const { user_id, createdat, email, ...accountInfo } = allAccountInfo[0];
  const latestBooks = await db.getLatestBooks(id);
  return { tags, accountInfo, latestBooks };
}

async function setReviewed(id) {
  try {
    await db.setReviewed(id);
  } catch (error) {
    throw new Error("Error setting");
  }
}

module.exports = {
  getInitInfo,
  setReviewed,
};
