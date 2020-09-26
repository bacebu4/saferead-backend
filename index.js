const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const { google } = require('googleapis')
const routes = require('./routes')

app.use(express.json())
app.use('/api', routes)
app.use(cors()) // TODO configure before deployment

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

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  authorize(JSON.parse(content))
})

function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  fs.readFile(TOKEN_PATH, async (err, token) => {
    const parsedToken = JSON.parse(token)
    oAuth2Client.setCredentials(parsedToken)
    CLIENT = oAuth2Client
    exports.CLIENT = CLIENT
    await startWatch(CLIENT)
  });
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

app.get("*", (req, res) => {
  res.send('hey')
})

app.listen(PORT, async () =>  {
  console.log('Server has been started on port 3000...');
})

