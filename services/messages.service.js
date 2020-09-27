const { google } = require('googleapis')
const fs = require('fs')
const { htmlUtils } = require('../utils')

let CLIENT
const TOKEN_PATH = 'token.json'

function startWatch(auth) {
  return new Promise(function (resolve) {
    const gmail = google.gmail({ version: 'v1', auth });
    gmail.users.watch({
      userId: 'me',
      resource: {
        "topicName": "projects/safe-read/topics/new"
      }
    }, (err) => {
      if (err) {
        return console.log('The API returned an error: ' + err);
      } else {
        resolve();
      }
    });
  })
}

const init = () => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    authorize(JSON.parse(content))
  })
}

function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  fs.readFile(TOKEN_PATH, async (err, token) => {
    const parsedToken = JSON.parse(token)
    oAuth2Client.setCredentials(parsedToken)
    CLIENT = oAuth2Client
    await startWatch(CLIENT)
  });
}

const getMessageById = async (id) => {
  const auth = CLIENT
  const gmail = google.gmail({version: 'v1', auth})
  const data = await gmail.users.messages.get({
    userId: 'me',
    id: id
  })
  const encodedHtml = data.data.payload.parts[1].body.data
  // eslint-disable-next-line no-undef
  const buff = Buffer.from(encodedHtml, 'base64')
  let html = buff.toString('utf-8')
  if (html.indexOf('Apple Books. <br>') !== -1) {
    const extractedNotes = htmlUtils.extractNotes(html)
    return extractedNotes
  }
}

const listMessages = async () => {
  const auth = CLIENT
  const gmail = google.gmail({version: 'v1', auth})
  const data = await gmail.users.messages.list({
    userId: 'me'
  })
  return data.data.messages.map((m) => m.id)
}

const newMessageEvent = async (body) => {
  console.log('work is real')
  console.log(body)
}

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent,
  init
}