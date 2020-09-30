const { extract } = require('./extract.util');

const findFromHeader = (data) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const header of data.data.payload.headers) {
    if (header.name === 'From') {
      return header.value;
    }
  }
};

const extractEmail = (data) => {
  const value = findFromHeader(data);
  return extract(value, '<', '>');
};

module.exports = {
  extractEmail,
};
