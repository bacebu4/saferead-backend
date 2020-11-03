const { registerService } = require("../services");

const register = async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  const token = await registerService.register(req.body);
  if (token === "Not valid") {
    res.status(400).send("Not valid");
  } else {
    res.json(token);
  }
};

module.exports = {
  register,
};
