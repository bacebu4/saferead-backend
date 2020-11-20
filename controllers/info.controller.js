const { infoService } = require("../services");

const getInitInfo = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const info = await infoService.getInitInfo(req.user.id);
  res.json(info);
};

const setReviewed = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await infoService.setReviewed(req.user.id);
    res.status(204).send("Successfully set");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getInitInfo,
  setReviewed,
};
