const { google } = require('googleapis')
const fs = require('fs')
const { htmlUtils } = require('../utils')
const { emailUtils } = require('../utils')
const { decodeUtils } = require('../utils')
const { txtUtils } = require('../utils')

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
  const extractedEmail = emailUtils.extractEmail(data)
  
  const encodedHtml = data.data.payload.parts[1].body.data
  if (encodedHtml) {
    const html = decodeUtils.decode(encodedHtml, 'utf-8')
    const appleTagIndex = html.indexOf('Apple Books. <br>')
    
    if (appleTagIndex !== -1) {
      return {
        extractedEmail,
        ...htmlUtils.extractAll(html)
      }
    }
  } else {
    const attachmentId = data.data.payload.parts[1].body.attachmentId
    const mimeType = data.data.payload.parts[1].mimeType

    if (attachmentId && mimeType === 'text/plain') {
      const attachment = await gmail.users.messages.attachments.get({
        userId: 'me',
        messageId: id,
        id: attachmentId
      })

      const bodyText = decodeUtils.decode(data.data.payload.parts[0].body.data, 'utf-8')
      const attachmentText = decodeUtils.decode(attachment.data.data, 'utf16le')

      return {
        extractedEmail,
        ...txtUtils.extractAll(bodyText, attachmentText)
      }
    } else {
      return 'empty'
    }
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