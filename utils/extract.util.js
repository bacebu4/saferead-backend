const extract = (string, openTag, closeTag) => {
  return string.slice(string.indexOf(openTag) + openTag.length, string.indexOf(closeTag)).trim()
}

module.exports = {
  extract
}