const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { htmlUtils } = require('../utils');
const { emailUtils } = require('../utils');
const { txtUtils } = require('../utils');
const { validateUtils } = require('../utils');
const updateService = require('./update.service');

let CLIENT;
const TOKEN_PATH = path.join(__dirname, 'token.json');

function startWatch(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  console.log('New watching started: once in 7 days');
  setTimeout(() => {
    startWatch(CLIENT);
  }, 1000 * 60 * 60 * 24 * 6);
  return gmail.users.watch({
    userId: 'me',
    resource: {
      topicName: 'projects/safe-read/topics/new',
    },
  });
}

function authorize(credentials) {
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0],
  );

  fs.readFile(TOKEN_PATH, async (err, token) => {
    const parsedToken = JSON.parse(token);
    oAuth2Client.setCredentials(parsedToken);
    CLIENT = oAuth2Client;
    await startWatch(CLIENT);
  });
}

const init = () => {
  const pathToCredentials = path.join(__dirname, 'credentials.json');
  fs.readFile(pathToCredentials, (err, content) => {
    if (err) return console.log('Error loading client secret file:', pathToCredentials);
    authorize(JSON.parse(content));
  });
};

const getMessageById = async (id) => {
  const auth = CLIENT;
  const gmail = google.gmail({ version: 'v1', auth });
  const data = await gmail.users.messages.get({
    userId: 'me',
    id,
  });

  const extractedEmail = emailUtils.extractEmail(data);

  const validate = validateUtils.validate(data);

  if (validate === 'ibooks') {
    return {
      extractedEmail,
      ...htmlUtils.extractAll(data),
    };
  } if (validate === 'litres') {
    const attachmentId = data.data.payload.parts[1].body?.attachmentId;
    const attachment = await gmail.users.messages.attachments.get({
      userId: 'me',
      messageId: id,
      id: attachmentId,
    });

    return {
      extractedEmail,
      ...txtUtils.extractAll(data, attachment),
    };
  }
  return validate;
};

const deleteMessageById = async (id) => {
  const auth = CLIENT;
  const gmail = google.gmail({ version: 'v1', auth });
  await gmail.users.messages.trash({
    userId: 'me',
    id,
  });
};

const listMessages = async () => {
  const auth = CLIENT;
  const gmail = google.gmail({ version: 'v1', auth });
  const data = await gmail.users.messages.list({
    userId: 'me',
  });
  return data.data.messages.map((m) => m.id);
};

const newMessageEvent = async (body) => {
  console.log('work is real');
  console.log(body);
};

const newMessageEventTest = async () => {
  try {
    console.log('work is real');
    const messages = await listMessages();
    console.log(messages);
    // eslint-disable-next-line no-restricted-syntax
    for (const m of messages) {
      const data = await getMessageById(m);
      if (data !== 'empty') {
        await updateService.start(data);
      }
      await deleteMessageById(m);
    }
  } catch (error) {
    console.log('error occurred', error);
  }
};

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent,
  newMessageEventTest,
  init,
};
