const { loginService } = require("../services");

const login = async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  const token = await loginService.login(req.body);
  if (token === "Email is already taken") {
    res.status(400).send("Email is already taken");
  } else {
    res.json(token);
  }
};

module.exports = {
  login,
};
