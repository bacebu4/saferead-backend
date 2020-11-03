/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../db");

async function register(payload) {
  try {
    const findResults = await db.getIdByEmail(payload.email);
    if (findResults !== "") {
      throw new Error("Not valid");
    }
    const salt = await bcrypt.genSalt(10);
    const hashUid = await bcrypt.hash(payload.uid, salt);
    const newUserId = uuidv4();
    await db.addUser(newUserId, payload.email, hashUid);
    const token = jwt.sign({ id: newUserId }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    return "Not valid";
  }
}

module.exports = {
  register,
};
