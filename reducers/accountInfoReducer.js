const accountInfoReducer = (accountInfo) => ({
  reviewAmount: accountInfo.review_amount,
  streak: 1,
  missed: 0,
  current: 0,
  reviewed: false,
  createdAt: accountInfo.createdat,
});

module.exports = accountInfoReducer;
