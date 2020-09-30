const extract = (string, openTag, closeTag) => string.slice(string.indexOf(openTag) + openTag.length, string.indexOf(closeTag)).trim();

const extractAndCut = (string, openTag, closeTag, resultArray, type) => {
  string = string.slice(string.indexOf(openTag) + openTag.length + 1);
  let extracted = string.slice(0, string.indexOf(closeTag));
  string = string.slice(extracted.length);
  extracted = extracted.trim();

  if (type === 'note' && extracted) {
    resultArray.push({
      extractedNote: extracted,
    });
  } else if (type === 'comment' && extracted) {
    resultArray[resultArray.length - 1].extractedComment = extracted;
  }
  return string;
};

module.exports = {
  extract,
  extractAndCut,
};
