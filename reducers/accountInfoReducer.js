const accountInfoReducer = (accountInfo) => ({
  reviewAmount: accountInfo.review_amount,
  streak: accountInfo.streak,
  missed: accountInfo.missed,
  reviewed: accountInfo.reviewed,
});

module.exports = accountInfoReducer;
