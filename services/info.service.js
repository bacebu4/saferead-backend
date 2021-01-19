/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const db = require("../db");

async function getInfo(id) {
  const allAccountInfo = await db.getAccountInfo(id);
  console.log(allAccountInfo);
  const latestReviewDate = await db.getLatestReviewDate(id);
  const streakBeginningDate = await db.getStreakBeginning(id);
  console.log("latestReviewDate", latestReviewDate);
  console.log("streakBeginningDate", streakBeginningDate);
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

module.exports = {
  getInfo,
  updateReviewHistory,
};
