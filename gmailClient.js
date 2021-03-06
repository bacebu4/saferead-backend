const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URIS,
);

oAuth2Client.setCredentials({
  access_token: process.env.GMAIL_ACCESS_TOKEN,
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  expiry_date: Number(process.env.GMAIL_EXPIRY_DATE),
  token_type: process.env.GMAIL_TOKEN_TYPE,
});

module.exports = oAuth2Client;
