const { extract } = require('./extract.util')

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
      extractedNotes.push(newString)
    }
  }
  return extractedNotes
}

const extractTitle = (html) => {
  const openTag = '<h1 class=\"booktitle\" style=\"margin-top:-5px;\" width=\"80%\">'
  const closeTag = '</h1>'
  return extract(html, openTag, closeTag)
}

const extractAuthor = (html) => {
  const openTag = '<h2 style=\"margin-top:-20px; font-family:Helvetica Neue, Arial, Sans-Serif;font-weight:normal;font-size:23px;color:rgb(26,26,26);line-height:26px; word-break: break-word; text-align:center; margin-bottom:46px;\">'
  const closeTag = '</h2>'
  return extract(html, openTag, closeTag)
}

const extractAll = (html) => {
  return {
    extractedAuthor: extractAuthor(html),
    extractedTitle: extractTitle(html),
    extractedNotes: extractNotes(html)
  }
}

module.exports = {
  extractAll
}