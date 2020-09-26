const client = require('../index')
const { google } = require('googleapis')

const getMessageById = async (req, res, next) => {
  const auth = client.CLIENT
  const gmail = google.gmail({version: 'v1', auth})
  const data = await gmail.users.messages.get({
    userId: 'me',
    id: '174c556cbbf56472'
  })
  const message = data.data;
  // const buff = Buffer.from(data.payload.parts[0].body.data, 'base64')
  // const text = buff.toString('utf-8')
  res.json(message)
}

const listMessages = async (req, res, next) => {
  const auth = client.CLIENT
  const gmail = google.gmail({version: 'v1', auth})
  const data = await gmail.users.messages.list({
    userId: 'me'
  })
  const message = data.data;
  res.json(message)
}

module.exports = {
  getMessageById,
  listMessages
}