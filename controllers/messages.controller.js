const { messagesService } = require('../services');

const getMessageById = async (_, res) => {
  const message = await messagesService.getMessageById('17502beb3b41933c');
  res.json(message);
};

const listMessages = async (_, res) => {
  const messages = await messagesService.listMessages();
  res.json(messages);
};

const newMessageEvent = async (req, res) => {
  await messagesService.newMessageEvent(req.body);
  res.sendStatus(200);
};

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent,
};
