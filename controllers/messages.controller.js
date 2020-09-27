const { messagesService } = require('../services')

const getMessageById = async (req, res) => {
  const message = await messagesService.getMessageById('174cdb428b324d3b')
  res.json(message)
}

const listMessages = async (req, res) => {
  const messages = await messagesService.listMessages()
  // messages.forEach((m) => {

  // })
  res.json(messages)
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