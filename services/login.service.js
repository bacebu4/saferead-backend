/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

async function login(email, password) {
  try {
    const findResults = await db.getIdPasswordByEmail(email);

    if (findResults === "") {
      throw new Error("not valid");
    }

    const isValid = await bcrypt.compare(password, findResults.password);
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
