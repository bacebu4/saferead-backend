/* eslint-disable operator-linebreak */
const { loginService } = require("../services");

const login = async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  const token = await loginService.login(req.body);
  if (token === "Not valid") {
    res.status(400).send("Not valid");
  } else {
    // res.json(token);
    res.header("auth-token", token).send("Logged in");
  }
};

module.exports = {
  login,
};
