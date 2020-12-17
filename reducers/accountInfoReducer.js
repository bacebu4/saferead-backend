const accountInfoReducer = (accountInfo) => ({
  reviewAmount: accountInfo.review_amount,
  streak: 1,
  missed: 0,
  reviewed: false,
});

module.exports = accountInfoReducer;
