/* eslint-disable no-useless-escape */
const extractNotes = (html) => {
  const openTag = '<p class=\"annotationrepresentativetext\">\r\n'
  const closeTag = '</p>\r\n'
  const extractedNotes = []
  while (html.indexOf(openTag) !== -1) {
    html = html.slice(html.indexOf(openTag) + openTag.length + 1)
    let newString = html.slice(0, html.indexOf(closeTag))
    html = html.slice(newString.length)
    newString = newString.trim()
    if (newString) {
      extractedNotes.push(newString.trim())
    }
  }
  return extractedNotes
}

module.exports = {
  extractNotes
}