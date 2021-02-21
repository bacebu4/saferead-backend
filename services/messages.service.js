/* eslint-disable operator-linebreak */
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { htmlUtils } = require("../utils");
const { emailUtils } = require("../utils");
const { txtUtils } = require("../utils");
const { validateUtils } = require("../utils");
const updateService = require("./update.service");

let CLIENT;
const TOKEN_PATH = path.join(__dirname, "token.json");

function startWatch(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  console.log("New watching started: once in 7 days");
  setTimeout(() => {
    startWatch(CLIENT);
  }, 1000 * 60 * 60 * 24 * 6);
  return gmail.users.watch({
    userId: "me",
    resource: {
      topicName: "projects/safe-read/topics/new",
    },
  });
}

function authorize(credentials) {
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  fs.readFile(TOKEN_PATH, async (err, token) => {
    const parsedToken = JSON.parse(token);
    oAuth2Client.setCredentials(parsedToken);
    CLIENT = oAuth2Client;
    await startWatch(CLIENT);
  });
}

const init = () => {
  const pathToCredentials = path.join(__dirname, "credentials.json");
  fs.readFile(pathToCredentials, (err, content) => {
    if (err) {
      return console.log(
        "Error loading client secret file:",
        pathToCredentials,
      );
    }
    authorize(JSON.parse(content));
  });
};

const getMessageById = async (id) => {
  const auth = CLIENT;
  const gmail = google.gmail({ version: "v1", auth });
  const data = await gmail.users.messages.get({
    userId: "me",
    id,
  });

  const extractedEmail = emailUtils.extractEmail(data);

  const validate = validateUtils.validate(data);

  if (validate === "ibooks") {
    return {
      extractedEmail,
      ...htmlUtils.extractAll(data),
    };
  }

  if (validate === "litres") {
    if (
      data.data.payload.parts[1].body &&
      data.data.payload.parts[1].body.attachmentId
    ) {
      const { attachmentId } = data.data.payload.parts[1].body;
      const attachment = await gmail.users.messages.attachments.get({
        userId: "me",
        messageId: id,
        id: attachmentId,
      });

      return {
        extractedEmail,
        ...txtUtils.extractAll(data, attachment),
      };
    }
  }

  return "empty";
};

const deleteMessageById = async (id) => {
  const auth = CLIENT;
  const gmail = google.gmail({ version: "v1", auth });
  await gmail.users.messages.trash({
    userId: "me",
    id,
  });
};

const listMessages = async () => {
  const auth = CLIENT;
  const gmail = google.gmail({ version: "v1", auth });
  const data = await gmail.users.messages.list({
    userId: "me",
  });
  if (data.data && data.data.messages) {
    return data.data.messages.map((m) => m.id);
  }
  console.log("No new messages");
  return [];
};

const newMessageEvent = async () => {
  try {
    console.log("Checking inbox");
    const messages = await listMessages();
    if (messages.length) {
      const getMessageQueue = [];
      const updatingQueue = [];
      const deletingQueue = [];

      messages.forEach((m) => {
        getMessageQueue.push(getMessageById(m));
      });
      const data = await Promise.all(getMessageQueue);
      data.forEach((d) => {
        if (d !== "empty") {
          updatingQueue.push(updateService.start(d));
        } else {
          console.log("empty");
        }
      });
      await Promise.all(updatingQueue);

      messages.forEach((m) => {
        deletingQueue.push(deleteMessageById(m));
      });

      await Promise.all(deletingQueue);
    }
  } catch (error) {
    console.log("Error occurred", error);
  } finally {
    console.log("Event ended");
  }
};

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent,
  init,
  deleteMessageById,
};
