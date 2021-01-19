const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

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
    throw new Error(error.message);
  }
}

async function register(email, password) {
  try {
    const findResults = await db.getIdByEmail(email);
    if (findResults !== "") {
      throw new Error("Not valid");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUserId = uuidv4();

    await db.addUser(newUserId, email, hashPassword);
    const token = jwt.sign({ id: newUserId }, process.env.TOKEN_SECRET);

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  login,
  register,
};
