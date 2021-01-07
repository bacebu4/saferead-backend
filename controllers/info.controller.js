const { infoService } = require("../services");

const getInitInfo = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const info = await infoService.getInitInfo(req.user.id);
  res.json(info);
};

module.exports = {
  getInitInfo,
};
