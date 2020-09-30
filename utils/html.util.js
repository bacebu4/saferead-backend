const { extract, extractAndCut } = require('./extract.util');
const { decode } = require('./decode.util');

/* eslint-disable no-useless-escape */
const extractNotes = (html) => {
  const openTag = '<p class=\"annotationrepresentativetext\">\r\n';
  const closeTag = '</p>\r\n';
  const openCommentTag = '<p class=\"annotationnote\">\r\n';
  const extractedNotes = [];
  while (html.indexOf(openTag) !== -1) {
    html = extractAndCut(html, openTag, closeTag, extractedNotes, 'note');
    html = extractAndCut(html, openCommentTag, closeTag, extractedNotes, 'comment');
  }
  return extractedNotes;
};

const extractTitle = (html) => {
  const openTag = '<h1 class=\"booktitle\" style=\"margin-top:-5px;\" width=\"80%\">';
  const closeTag = '</h1>';
  return extract(html, openTag, closeTag);
};

const extractAuthor = (html) => {
  const openTag = '<h2 style=\"margin-top:-20px; font-family:Helvetica Neue, Arial, Sans-Serif;font-weight:normal;font-size:23px;color:rgb(26,26,26);line-height:26px; word-break: break-word; text-align:center; margin-bottom:46px;\">';
  const closeTag = '</h2>';
  return extract(html, openTag, closeTag);
};

const extractAll = (data) => {
  const encodedHtml = data.data.payload.parts[1].body.data;
  const html = decode(encodedHtml, 'utf-8');

  return {
    extractedAuthor: extractAuthor(html),
    extractedTitle: extractTitle(html),
    extractedNotes: extractNotes(html),
  };
};

module.exports = {
  extractAll,
};
