const { messagesService } = require('../services')

const getMessageById = async (req, res) => {
  const message = await messagesService.getMessageById('174c556cbbf56472')
  res.json(message)
}

const listMessages = async (req, res) => {
  const message = await messagesService.listMessages()
  res.json(message)
}

const newMessageEvent = async (req, res) => {
  await messagesService.newMessageEvent(req.body)
  res.sendStatus(200)
}

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent
}