const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const { google } = require('googleapis')

let CLIENT

const TOKEN_PATH = 'token.json'


fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  authorize(JSON.parse(content))
})

function delay(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms);
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
  });
}

function checkNewMessages() {
  return new Promise(async (res, rej) => {
    try {
      const data = await listMessages(CLIENT)
      const messages = data.messages
      const messagesIds = messages.map((m) => m.id)
      const amountOfMessages = data.resultSizeEstimate
      res(messagesIds)
    }
    catch(e) {
      // console.log(e);
      console.log('No new messages')
      res('No new messages')
    }
  })
}

function listMessages(auth) {
  return new Promise(async (res, rej) => {
    try {
      const gmail = google.gmail({version: 'v1', auth})
      const data = await gmail.users.messages.list({
        userId: 'me',
      })
      if (!data.data.resultSizeEstimate) {
        rej('No new messages')
      }
      res(data.data)
    }
    catch (e) {
      console.log('No messages found')
      rej(e)
    }
  })
}

async function deleteMessage(auth, id, resMain) {
  try {
    const gmail = google.gmail({version: 'v1', auth})
    const res = await gmail.users.messages.trash({
      userId: 'me',
      id: id
    })
    resMain(res.data)
  }
  catch (e) {
    console.log(e)
  }
}

function getMessageById(auth, id, resMain) {
  const gmail = google.gmail({version: 'v1', auth})
  gmail.users.messages.get({
    userId: 'me',
    id: id
  }).then((res) => {
    const message = res.data;
    resMain(message)
  }).catch((e) => {
    console.log('error', e.errors[0].message)
  })
}

function getMessageAttachment(auth, id, attachmentId, resMain) {
  const gmail = google.gmail({version: 'v1', auth})
  gmail.users.messages.attachments.get({
    userId: 'me',
    messageId: id,
    id: attachmentId
  }).then((res) => {
    const message = res.data
    resMain(message)
  }).catch((e) => {
    console.log('error', e.errors[0].message)
  })
}

function getMessageAttachmentId(auth, id, resMain) {
  const gmail = google.gmail({version: 'v1', auth})
  gmail.users.messages.get({
    userId: 'me',
    id: id
  }).then((res) => {
    const message = res.data
    resMain(message)
  }).catch((e) => {
    console.log('error', e.errors[0].message)
  })
  
}

const PORT = process.env.PORT || 3000

app.use(cors()) // TODO configure before deployment

app.get('/api/allMessages', async (req, res) => {
  // console.log(req.params.amount)
  try {
    const data = await listMessages(CLIENT)
    const messages = data.messages
    const messagesIds = messages.map((m) => m.id)
    const amountOfMessages = data.resultSizeEstimate
    res.json(messagesIds)
  }
  catch(e) {
    console.log(e);
    res.send('No new messages')
  }
})


app.get('/api/messageAttachmentId', (req, res) => {
  const p = new Promise((res, rej) => {
    getMessageAttachmentId(CLIENT, '174b6230de4a3adb', res)
  })
  p.then((data) => {
    // const buff = Buffer.from(data.payload.parts, 'base64')
    // const text = buff.toString('utf-8')
    res.json(data.payload.parts[0].body.attachmentId)
  })
})

app.get('/api/messageAttachment', (req, res) => {
  const p = new Promise((res, rej) => {
    getMessageAttachment(CLIENT, '174b6230de4a3adb', 'ANGjdJ8y5LyCoz4NTV8cB7PzkQlguTMgvQPpRqw0rb_xaD1PWrc1DswMp1OhthG38i-42tPPJKGP_75FIu_4n9ILaWWqJsbMhpvhlDx9QonhGAst2tB0v-HntmnfUtrSYpnl-A3Ik9SSElqcJA-z-bHOlG7E748zAopDrZJetseL8xg0z3dsM5CVBwTrFiou4e3wQyiCtjvuUeEOMl2vYivBkmsYG-KgIia7TH8qS9tDNS08G8KkHwfuJMMBcAcSQ-eFLP3Ph6YBnlCZzhqlTpmKk7Q6BC_CdMiEiqewgGnwxf7ur3fGOpuWzsUuOVrcM6q_bRpFmt-pKPgI270INSAona10yhiEri2THSEiXS-bQLzOUnVPPTsJJQAz6UN_Kr2lXjeQNrGOOO-hb7jj', res)
  })
  p.then((data) => {
    const buff = Buffer.from(data.data, 'base64') 
    const text = buff.toString('utf16le')
    res.json(text)
  })
})

app.get('/api/message', (req, res) => {
  const p = new Promise((res, rej) => {
    getMessageById(CLIENT, '174b01a44e70f8f3', res)
  })
  p.then((data) => {
    // const buff = Buffer.from(data.payload.parts[0].body.data, 'base64')
    // const text = buff.toString('utf-8')
    res.json(data)
  })
})

app.get('/api/deleteMessage', (req, res) => {
  const p = new Promise((res, rej) => {
    deleteMessage(CLIENT, '174b01a44e70f8f3', res)
  })
  p.then((data) => {
    res.json(data)
  })
})
app.post('/api/post', (req, res) => {
  console.log('work is real');
})

app.get("*", (req, res) => {
  res.send('hey')
})



app.listen(PORT, async () =>  {
  console.log('Server has been started on port 3000...');
  // while (true) {
  //   const data = await checkNewMessages()
  //   if (data !== 'No new messages') {
  //     console.log('New messages!!!');
  //   }
  //   await delay(5000)
  // }
})