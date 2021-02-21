/* eslint-disable operator-linebreak */
const { decode } = require("./decode.util");
const { openNoteTag } = require("./html.util");

/**
 * @param {*} data - gmail response from getting email
 * @returns {"ibooks" | "litres" | "empty"} reading service name
 */
const validate = (data) => {
  let encodedHtml;
  const payload = data.data.payload;

  if (payload.parts && payload.parts.length > 1) {
    encodedHtml = payload.parts[1].body.data;
  }

  if (encodedHtml) {
    const html = decode(encodedHtml, "utf-8");

    const appleTagIndex = html.indexOf(openNoteTag);

    if (appleTagIndex > -1) {
      return "ibooks";
    }
  } else {
    if (payload.parts && payload.parts.length > 1) {
      if (
        payload.parts[1].body &&
        payload.parts[1].body.attachmentId &&
        payload.parts[1].mimeType === "text/plain"
      ) {
        return "litres";
      }
    }
  }

  return "empty";
};

module.exports = {
  validate,
};
