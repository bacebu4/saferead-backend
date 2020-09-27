const { extract } = require('./extract.util')

const findFromHeader = (data) => {
  for (let header of data.data.payload.headers) {
    if (header.name === 'From') {
      return header.value
    }
  }
}

const extractEmail = (data) => {
  let value = findFromHeader(data)
  return extract(value, '<', '>')
}

module.exports = {
  extractEmail
}