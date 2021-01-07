/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function getInitInfo(id) {
  const tags = await db.getAllTags(id);
  const allAccountInfo = await db.getAccountInfo(id);
  const {
    user_id,
    createdat,
    email,
    password,
    ...accountInfo
  } = allAccountInfo[0];
  const latestBooks = await db.getLatestBooks(id);
  const latestReviewDate = await db.getLatestReviewDate(id);
  const streakBeginningDate = await db.getStreakBeginning(id);
  return {
    tags,
    accountInfo,
    latestBooks,
    latestReviewDate,
    streakBeginningDate,
  };
}

async function updateReviewHistory(userId, date) {
  try {
    await db.updateReviewHistory(userId, date);
  } catch (error) {
    throw new Error("Error setting");
  }
}

module.exports = {
  getInitInfo,
  updateReviewHistory,
};
