/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");
const db = require("../db");

async function login(payload) {
  const findResults = await db.getIdUidByEmail(payload.email);
  if (findResults === "") {
    return "Email was not found";
  }
  const isValid = await bcrypt.compare(payload.uid, findResults.uid);
  return isValid;
}

module.exports = {
  login,
};
