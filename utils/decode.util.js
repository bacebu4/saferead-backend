const decode = (base64, utfNumber) => {
  const buff = Buffer.from(base64, 'base64');
  return buff.toString(utfNumber);
};

module.exports = {
  decode,
};
