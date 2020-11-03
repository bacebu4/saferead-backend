/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

async function login(payload) {
  try {
    const findResults = await db.getIdPasswordByEmail(payload.email);
    if (findResults === "") {
      throw new Error("not valid");
    }
    const isValid = await bcrypt.compare(
      payload.password,
      findResults.password,
    );
    if (!isValid) {
      throw new Error("not valid");
    }
    const token = jwt.sign(
      { id: findResults.user_id },
      process.env.TOKEN_SECRET,
    );
    return token;
  } catch (error) {
    return "Not valid";
  }
}

module.exports = {
  login,
};
