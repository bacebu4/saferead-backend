/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function getInfo(id) {
  const allAccountInfo = await db.getAccountInfo(id);
  const latestReviewDate = await db.getLatestReviewDate(id);
  const streakBeginningDate = await db.getStreakBeginning(id);
  return {
    reviewAmount: +allAccountInfo[0].review_amount,
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

async function updateReviewAmount(userId, reviewAmount) {
  try {
    await db.updateReviewAmount(userId, reviewAmount);
  } catch (error) {
    throw new Error("Error setting");
  }
}

module.exports = {
  getInfo,
  updateReviewHistory,
  updateReviewAmount,
};
