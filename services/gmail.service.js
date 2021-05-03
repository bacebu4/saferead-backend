const { google } = require("googleapis");
const { ibooksUtils } = require("../utils");
const { emailUtils } = require("../utils");
const { litresUtils } = require("../utils");
const { validateUtils } = require("../utils");
const updateService = require("./update.service");
const oAuth2Client = require("../gmailClient");

function startWatchingForNewMessages() {
  const auth = oAuth2Client;
  const gmail = google.gmail({ version: "v1", auth });
  console.log("New watching started: once in 7 days");
  setTimeout(() => {
    startWatchingForNewMessages();
  }, 1000 * 60 * 60 * 24 * 6);
  return gmail.users.watch({
    userId: "me",
    resource: {
      topicName: "projects/safe-read/topics/new",
    },
  });
}

const getExtractedDataByMessageId = async (id) => {
  const auth = oAuth2Client;
  const gmail = google.gmail({ version: "v1", auth });
  const data = await gmail.users.messages.get({
    userId: "me",
    id,
  });

  const extractedEmail = emailUtils.extractEmail(data);

  const serviceName = validateUtils.validate(data);

  switch (serviceName) {
    case "ibooks":
      return {
        extractedEmail,
        ...ibooksUtils.extractAll(data),
      };

    case "litres":
      const { attachmentId } = data.data.payload.parts[1].body;

      const attachment = await gmail.users.messages.attachments.get({
        userId: "me",
        messageId: id,
        id: attachmentId,
      });

      return {
        extractedEmail,
        ...litresUtils.extractAll(data, attachment),
      };

    default:
      return "empty";
  }
};

const deleteMessageById = async (id) => {
  const auth = oAuth2Client;
  const gmail = google.gmail({ version: "v1", auth });
  await gmail.users.messages.trash({
    userId: "me",
    id,
  });
};

const listMessagesId = async () => {
  const auth = oAuth2Client;
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
    const messagesId = await listMessagesId();
    if (messagesId.length) {
      const getMessageQueue = [];
      const updatingQueue = [];
      const deletingQueue = [];

      messagesId.forEach((messageId) => {
        getMessageQueue.push(getExtractedDataByMessageId(messageId));
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

      messagesId.forEach((m) => {
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
  getExtractedDataByMessageId,
  listMessagesId,
  newMessageEvent,
  startWatchingForNewMessages,
  deleteMessageById,
};
