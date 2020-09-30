const { decode } = require('./decode.util');

const validate = (data) => {
  let encodedHtml;
  if (data.data.payload.parts?.length > 1) {
    encodedHtml = data.data.payload.parts[1].body.data;
  }
  if (encodedHtml) {
    const html = decode(encodedHtml, 'utf-8');
    const appleTagIndex = html.indexOf('Apple Books. <br>');
    if (appleTagIndex !== -1) {
      return 'ibooks';
    }
  } else {
    let attachmentId;
    let mimeType;
    if (data.data.payload.parts?.length > 1) {
      attachmentId = data.data.payload.parts[1].body?.attachmentId;
      mimeType = data.data.payload.parts[1].mimeType;
    }

    if (attachmentId && mimeType === 'text/plain') {
      return 'litres';
    }
  }
  return 'empty';
};

module.exports = {
  validate,
};
