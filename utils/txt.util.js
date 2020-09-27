const { extract } = require('./extract.util')

const extractAll = (bodyText, attachmentText) => {
  const extractedNotes = attachmentText.split('\n\n\n')
  extractedNotes.pop()

  const extractedTitle = bodyText.slice(0, bodyText.indexOf('\r\n'))

  const extractedAuthor = extract(bodyText, '\r\n', '\r\n\r\n')
  return {
    extractedAuthor,
    extractedTitle,
    extractedNotes
  }
}

module.exports = {
  extractAll
}