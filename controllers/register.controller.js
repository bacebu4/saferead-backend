const { registerService } = require("../services");

const register = async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  const token = await registerService.register(req.body);
  if (token === "Email is already taken") {
    res.status(400).send("Email is already taken");
  } else {
    res.header("auth-token", token).send("Registered");
  }
};

module.exports = {
  register,
};
