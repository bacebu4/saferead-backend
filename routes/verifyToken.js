/* eslint-disable func-names */
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = isVerified;
    next();
  } catch (error) {
    res.status(400).send("Not valid");
  }
};
