const { gmailService } = require("../services");

const newMessageEvent = async (req, res) => {
  try {
    await gmailService.newMessageEvent(req.body);
  } catch (error) {
  } finally {
    res.sendStatus(200);
  }
};

module.exports = {
  newMessageEvent,
};
