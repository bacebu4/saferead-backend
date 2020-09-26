const { google } = require('googleapis')
const client = require('../index')

const getMessageById = async (id) => {
  const auth = client.CLIENT
  const gmail = google.gmail({version: 'v1', auth})
  const data = await gmail.users.messages.get({
    userId: 'me',
    id: id
  })
  // const message = data.data;
  // const buff = Buffer.from(data.payload.parts[0].body.data, 'base64')
  // const text = buff.toString('utf-8')
  return data
}

const listMessages = async () => {
  const auth = client.CLIENT
  const gmail = google.gmail({version: 'v1', auth})
  const data = await gmail.users.messages.list({
    userId: 'me'
  })
  return data
}

const newMessageEvent = async (body) => {
  console.log('work is real')
  console.log(body)
}

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent
}