const { extract } = require("./extract.util");
const { decode } = require("./decode.util");

const deleteQuotes = (string) => {
  string = string.slice(1, string.length - 1);
  return string;
};

const extractNotesAndComments = (string) => {
  const extractedNotes = string.split("\n\n\n");
  extractedNotes.pop();

  extractedNotes.forEach((note, i, notes) => {
    const splittedNote = note.split("\n\n");
    if (splittedNote.length === 2) {
      notes[i] = {
        extractedNote: deleteQuotes(splittedNote[0].trim()),
        extractedComment: splittedNote[1],
      };
    } else {
      notes[i] = {
        extractedNote: deleteQuotes(note.trim()),
      };
    }
  });
  return extractedNotes;
};

const extractAll = (data, attachment) => {
  const bodyText = decode(data.data.payload.parts[0].body.data, "utf-8");

  const attachmentText = decode(attachment.data.data, "utf16le");

  const extractedNotes = extractNotesAndComments(attachmentText);

  const extractedTitle = bodyText.slice(0, bodyText.indexOf("\r\n"));

  const extractedAuthor = extract(bodyText, "\r\n", "\r\n\r\n");

  return {
    extractedAuthor,
    extractedTitle,
    extractedNotes,
  };
};

module.exports = {
  extractAll,
};
