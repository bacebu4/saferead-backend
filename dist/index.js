// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"routes/verifyToken.js":[function(require,module,exports) {
/* eslint-disable func-names */
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = isVerified;
    next();
  } catch (error) {
    res.status(400).send("Not valid");
  }
};
},{}],"utils/extract.util.js":[function(require,module,exports) {
const extract = (string, openTag, closeTag) => string.slice(string.indexOf(openTag) + openTag.length, string.indexOf(closeTag)).trim();

const extractAndCut = (string, openTag, closeTag, resultArray, type) => {
  string = string.slice(string.indexOf(openTag) + openTag.length + 1);
  let extracted = string.slice(0, string.indexOf(closeTag));
  string = string.slice(extracted.length);
  extracted = extracted.trim();

  if (type === 'note' && extracted) {
    resultArray.push({
      extractedNote: extracted
    });
  } else if (type === 'comment' && extracted) {
    resultArray[resultArray.length - 1].extractedComment = extracted;
  }

  return string;
};

module.exports = {
  extract,
  extractAndCut
};
},{}],"utils/decode.util.js":[function(require,module,exports) {
const decode = (base64, utfNumber) => {
  const buff = Buffer.from(base64, 'base64');
  return buff.toString(utfNumber);
};

module.exports = {
  decode
};
},{}],"utils/html.util.js":[function(require,module,exports) {
const {
  extract,
  extractAndCut
} = require('./extract.util');

const {
  decode
} = require('./decode.util');
/* eslint-disable no-useless-escape */


const extractNotes = html => {
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

const extractTitle = html => {
  const openTag = '<h1 class=\"booktitle\" style=\"margin-top:-5px;\" width=\"80%\">';
  const closeTag = '</h1>';
  return extract(html, openTag, closeTag);
};

const extractAuthor = html => {
  const openTag = '<h2 style=\"margin-top:-20px; font-family:Helvetica Neue, Arial, Sans-Serif;font-weight:normal;font-size:23px;color:rgb(26,26,26);line-height:26px; word-break: break-word; text-align:center; margin-bottom:46px;\">';
  const closeTag = '</h2>';
  return extract(html, openTag, closeTag);
};

const extractAll = data => {
  const encodedHtml = data.data.payload.parts[1].body.data;
  const html = decode(encodedHtml, 'utf-8');
  return {
    extractedAuthor: extractAuthor(html),
    extractedTitle: extractTitle(html),
    extractedNotes: extractNotes(html)
  };
};

module.exports = {
  extractAll
};
},{"./extract.util":"utils/extract.util.js","./decode.util":"utils/decode.util.js"}],"utils/email.util.js":[function(require,module,exports) {
const {
  extract
} = require('./extract.util');

const findFromHeader = data => {
  // eslint-disable-next-line no-restricted-syntax
  for (const header of data.data.payload.headers) {
    if (header.name === 'From') {
      return header.value;
    }
  }
};

const extractEmail = data => {
  const value = findFromHeader(data);
  return extract(value, '<', '>');
};

module.exports = {
  extractEmail
};
},{"./extract.util":"utils/extract.util.js"}],"utils/txt.util.js":[function(require,module,exports) {
const {
  extract
} = require('./extract.util');

const {
  decode
} = require('./decode.util');

const deleteQuotes = string => {
  string = string.slice(1, string.length - 1);
  return string;
};

const extractTxtNotes = string => {
  const extractedNotes = string.split('\n\n\n');
  extractedNotes.pop();
  extractedNotes.forEach((note, i, notes) => {
    const splittedNote = note.split('\n\n');

    if (splittedNote.length === 2) {
      notes[i] = {
        extractedNote: deleteQuotes(splittedNote[0].trim()),
        extractedComment: splittedNote[1]
      };
    } else {
      notes[i] = {
        extractedNote: deleteQuotes(note.trim())
      };
    }
  });
  return extractedNotes;
};

const extractAll = (data, attachment) => {
  const bodyText = decode(data.data.payload.parts[0].body.data, 'utf-8');
  const attachmentText = decode(attachment.data.data, 'utf16le');
  const extractedNotes = extractTxtNotes(attachmentText);
  const extractedTitle = bodyText.slice(0, bodyText.indexOf('\r\n'));
  const extractedAuthor = extract(bodyText, '\r\n', '\r\n\r\n');
  return {
    extractedAuthor,
    extractedTitle,
    extractedNotes
  };
};

module.exports = {
  extractAll
};
},{"./extract.util":"utils/extract.util.js","./decode.util":"utils/decode.util.js"}],"utils/validate.util.js":[function(require,module,exports) {
const {
  decode
} = require('./decode.util');

const validate = data => {
  var _data$data$payload$pa;

  let encodedHtml;

  if (((_data$data$payload$pa = data.data.payload.parts) === null || _data$data$payload$pa === void 0 ? void 0 : _data$data$payload$pa.length) > 1) {
    encodedHtml = data.data.payload.parts[1].body.data;
  }

  if (encodedHtml) {
    const html = decode(encodedHtml, 'utf-8');
    const appleTagIndex = Math.max(html.indexOf('Apple Books. <br>'), html.indexOf('Книги. <br>'));

    if (appleTagIndex !== -1) {
      return 'ibooks';
    }
  } else {
    var _data$data$payload$pa2;

    let attachmentId;
    let mimeType;

    if (((_data$data$payload$pa2 = data.data.payload.parts) === null || _data$data$payload$pa2 === void 0 ? void 0 : _data$data$payload$pa2.length) > 1) {
      var _data$data$payload$pa3;

      attachmentId = (_data$data$payload$pa3 = data.data.payload.parts[1].body) === null || _data$data$payload$pa3 === void 0 ? void 0 : _data$data$payload$pa3.attachmentId;
      mimeType = data.data.payload.parts[1].mimeType;
    }

    if (attachmentId && mimeType === 'text/plain') {
      return 'litres';
    }
  }

  return 'empty';
};

module.exports = {
  validate
};
},{"./decode.util":"utils/decode.util.js"}],"utils/index.js":[function(require,module,exports) {
const htmlUtils = require('./html.util');

const emailUtils = require('./email.util');

const decodeUtils = require('./decode.util');

const txtUtils = require('./txt.util');

const validateUtils = require('./validate.util');

module.exports = {
  htmlUtils,
  emailUtils,
  decodeUtils,
  txtUtils,
  validateUtils
};
},{"./html.util":"utils/html.util.js","./email.util":"utils/email.util.js","./decode.util":"utils/decode.util.js","./txt.util":"utils/txt.util.js","./validate.util":"utils/validate.util.js"}],"db/getNotes.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getNotes = async id => {
  const raw = await _index.manager.query(
  /* sql */
  `
    select note_text, comment_text, book_title, author_full_name, n.note_id
    from users
        join notes n on users.user_id = n.user_id
        join books b on n.book_id = b.book_id
        join authors a on b.author_id = a.author_id
        left join comments c on n.note_id = c.note_id
    where users.user_id = $1 and seen = false;
  `, [id]);
  return raw;
};

module.exports = {
  getNotes
};
},{"./index":"db/index.js"}],"db/getIdByEmail.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getIdByEmail = async email => {
  if (email.includes("@me.com")) {
    email = email.replace("@me.com", "@icloud.com");
  }

  const data = await _index.manager.query(
  /* sql */
  `
    select user_id
    from users
    where email = $1;
  `, [email]);

  if (data.length) {
    return data[0].user_id;
  }

  return "";
};

module.exports = {
  getIdByEmail
};
},{"./index":"db/index.js"}],"db/getIdPasswordByEmail.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getIdPasswordByEmail = async email => {
  if (email.includes("@me.com")) {
    email = email.replace("@me.com", "@icloud.com");
  }

  const data = await _index.manager.query(
  /* sql */
  `
    select user_id, password
    from users
    where email = $1;
  `, [email]);

  if (data.length) {
    return data[0];
  }

  return "";
};

module.exports = {
  getIdPasswordByEmail
};
},{"./index":"db/index.js"}],"db/markAsSeen.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const markAsSeen = async id => {
  await _index.manager.query(
  /* sql */
  `
    update notes
    set seen = true
    where note_id = $1;
  `, [id]);
};

module.exports = {
  markAsSeen
};
},{"./index":"db/index.js"}],"db/resetSeenFlag.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const resetSeenFlag = async id => {
  await _index.manager.query(
  /* sql */
  `
    update notes
    set seen = false
    where user_id = $1;
  `, [id]);
};

module.exports = {
  resetSeenFlag
};
},{"./index":"db/index.js"}],"db/addAuthor.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const {
  v4: uuidv4
} = require('uuid');

const addAuthor = async author => {
  const data = await _index.manager.query(
  /* sql */
  `
    select author_id
    from authors
    where author_full_name = $1;
  `, [author]);

  if (data.length) {
    return data[0].author_id;
  }

  const newGeneratedId = uuidv4();
  await _index.manager.query(
  /* sql */
  `
    insert into authors(author_id, author_full_name) values ($1, $2);
  `, [newGeneratedId, author]);
  return newGeneratedId;
};

module.exports = {
  addAuthor
};
},{"./index":"db/index.js"}],"db/addBook.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const {
  v4: uuidv4
} = require('uuid');

const addBook = async (authorId, title) => {
  const data = await _index.manager.query(
  /* sql */
  `
    select book_id
    from books
    where book_title = $1;
  `, [title]);

  if (data.length) {
    return data[0].book_id;
  }

  const newGeneratedId = uuidv4();
  await _index.manager.query(
  /* sql */
  `
    insert into books(book_id, author_id, book_title) VALUES ($1, $2, $3);
  `, [newGeneratedId, authorId, title]);
  return newGeneratedId;
};

module.exports = {
  addBook
};
},{"./index":"db/index.js"}],"db/addNotes.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const {
  v4: uuidv4
} = require('uuid');

const addNote = async (userId, bookId, note) => {
  const newGeneratedNoteId = uuidv4();
  await _index.manager.query(
  /* sql */
  `
    insert into notes(user_id, book_id, createdAt, updatedAt, note_text, seen, note_id)
    VALUES ($1, $2, now(), now(), $3, false, $4);
  `, [userId, bookId, note.extractedNote, newGeneratedNoteId]);

  if (note === null || note === void 0 ? void 0 : note.extractedComment) {
    const newGeneratedCommentId = uuidv4();
    await _index.manager.query(
    /* sql */
    `
      insert into comments(note_id, comment_text, createdAt, updatedAt, comment_id) VALUES ($1, $2, now(), now(), $3);
  `, [newGeneratedNoteId, note.extractedComment, newGeneratedCommentId]);
  }
};

const addNotes = async (userId, bookId, notes) => {
  // TODO delete restricted syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const note of notes) {
    await addNote(userId, bookId, note);
  }
};

module.exports = {
  addNotes
};
},{"./index":"db/index.js"}],"db/getTagNotes.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getTagNotes = async id => {
  const raw = await _index.manager.query(
  /* sql */
  `
    select *
    from notes_tags
    join tags t on notes_tags.tag_id = t.tag_id
    where note_id = $1;
  `, [id]);
  return raw;
};

module.exports = {
  getTagNotes
};
},{"./index":"db/index.js"}],"db/getAmount.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getAmount = async id => {
  const raw = await _index.manager.query(
  /* sql */
  `
    select review_amount
    from users
    where users.user_id = $1
  `, [id]);
  return raw[0].review_amount;
};

module.exports = {
  getAmount
};
},{"./index":"db/index.js"}],"db/getAllTags.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getAllTags = async id => {
  const raw = await _index.manager.query(
  /* sql */
  `
    select tag_id, tag_name, hue
    from tags
    where user_id = $1
  `, [id]);
  return raw;
};

module.exports = {
  getAllTags
};
},{"./index":"db/index.js"}],"db/getAccountInfo.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getAccountInfo = async id => {
  const raw = await _index.manager.query(
  /* sql */
  `
    select *
    from users
    where user_id = $1
  `, [id]);
  return raw;
};

module.exports = {
  getAccountInfo
};
},{"./index":"db/index.js"}],"db/getLatestBooks.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const getLatestBooks = async id => {
  const raw = await _index.manager.query(
  /* sql */
  `
    select distinct book_title, author_full_name, book_id from (
      select distinct book_title, author_full_name, createdAt, b.book_id from notes
          join books b on notes.book_id = b.book_id
          join authors a on a.author_id = b.author_id
          where user_id = $1
          order by createdAt desc
      ) as t
    limit 10
  `, [id]);
  return raw;
};

module.exports = {
  getLatestBooks
};
},{"./index":"db/index.js"}],"db/addUser.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const addUser = async (id, email, password) => {
  const data = await _index.manager.query(
  /* sql */
  `
    insert into 
    users(user_id, review_amount, streak, missed, current, reviewed, createdAt, email, password) 
    VALUES ($1, 3, 0, 0, 0, false, now(), $2, $3)
  `, [id, email, password]);
  return data;
};

module.exports = {
  addUser
};
},{"./index":"db/index.js"}],"db/addExistingTag.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

/* eslint-disable camelcase */
const addExistingTag = async (tag_id, note_id) => {
  const data = await _index.manager.query(
  /* sql */
  `
    insert into notes_tags(tag_id, note_id) 
    VALUES ($1, $2);
  `, [tag_id, note_id]);
  return data;
};

module.exports = {
  addExistingTag
};
},{"./index":"db/index.js"}],"db/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manager = void 0;

const {
  createConnection
} = require("typeorm");

require("reflect-metadata");

const {
  getNotes
} = require("./getNotes");

const {
  getIdByEmail
} = require("./getIdByEmail");

const {
  getIdPasswordByEmail
} = require("./getIdPasswordByEmail");

const {
  markAsSeen
} = require("./markAsSeen");

const {
  resetSeenFlag
} = require("./resetSeenFlag");

const {
  addAuthor
} = require("./addAuthor");

const {
  addBook
} = require("./addBook");

const {
  addNotes
} = require("./addNotes");

const {
  getTagNotes
} = require("./getTagNotes");

const {
  getAmount
} = require("./getAmount");

const {
  getAllTags
} = require("./getAllTags");

const {
  getAccountInfo
} = require("./getAccountInfo");

const {
  getLatestBooks
} = require("./getLatestBooks");

const {
  addUser
} = require("./addUser");

const {
  addExistingTag
} = require("./addExistingTag"); // eslint-disable-next-line import/no-mutable-exports


let manager;
exports.manager = manager;

const init = async () => {
  try {
    let connection;

    if (process.env.DATABASE_URL) {
      connection = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL
      });
      console.log("Connected to DB @ heroku");
    } else {
      connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: process.env.DB_PORT,
        username: "postgres",
        password: "123",
        database: "postgres" // logging: true,

      });
      console.log("Connected to DB locally");
    }

    exports.manager = manager = connection.manager;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  init,
  getNotes,
  markAsSeen,
  resetSeenFlag,
  addAuthor,
  addBook,
  addNotes,
  getIdByEmail,
  getTagNotes,
  getAmount,
  getAllTags,
  getAccountInfo,
  getLatestBooks,
  addUser,
  getIdPasswordByEmail,
  addExistingTag
};
},{"./getNotes":"db/getNotes.js","./getIdByEmail":"db/getIdByEmail.js","./getIdPasswordByEmail":"db/getIdPasswordByEmail.js","./markAsSeen":"db/markAsSeen.js","./resetSeenFlag":"db/resetSeenFlag.js","./addAuthor":"db/addAuthor.js","./addBook":"db/addBook.js","./addNotes":"db/addNotes.js","./getTagNotes":"db/getTagNotes.js","./getAmount":"db/getAmount.js","./getAllTags":"db/getAllTags.js","./getAccountInfo":"db/getAccountInfo.js","./getLatestBooks":"db/getLatestBooks.js","./addUser":"db/addUser.js","./addExistingTag":"db/addExistingTag.js"}],"services/update.service.js":[function(require,module,exports) {
const db = require('../db');

const messageService = require('./messages.service');

async function start(data, id) {
  try {
    const authorId = await db.addAuthor(data.extractedAuthor);
    console.log('authorId: ', authorId);
    const bookId = await db.addBook(authorId, data.extractedTitle);
    console.log('bookId: ', bookId);
    const userId = await db.getIdByEmail(data.extractedEmail);

    if (userId) {
      await db.addNotes(userId, bookId, data.extractedNotes);
    } else {
      console.log('User was not found');
    }
  } catch (error) {
    console.log('Error during adding note to db. The message will be deleted');
    console.log(error);
    messageService.deleteMessageById(id);
  }
}

module.exports = {
  start
};
},{"../db":"db/index.js","./messages.service":"services/messages.service.js"}],"services/messages.service.js":[function(require,module,exports) {
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  google
} = require('googleapis');

const fs = require('fs');

const path = require('path');

const {
  htmlUtils
} = require('../utils');

const {
  emailUtils
} = require('../utils');

const {
  txtUtils
} = require('../utils');

const {
  validateUtils
} = require('../utils');

const updateService = require('./update.service');

let CLIENT;
const TOKEN_PATH = path.join(__dirname, 'token.json');

function startWatch(auth) {
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  console.log('New watching started: once in 7 days');
  setTimeout(() => {
    startWatch(CLIENT);
  }, 1000 * 60 * 60 * 24 * 6);
  return gmail.users.watch({
    userId: 'me',
    resource: {
      topicName: 'projects/safe-read/topics/new'
    }
  });
}

function authorize(credentials) {
  // eslint-disable-next-line camelcase
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  fs.readFile(TOKEN_PATH, async (err, token) => {
    const parsedToken = JSON.parse(token);
    oAuth2Client.setCredentials(parsedToken);
    CLIENT = oAuth2Client;
    await startWatch(CLIENT);
  });
}

const init = () => {
  const pathToCredentials = path.join(__dirname, 'credentials.json');
  fs.readFile(pathToCredentials, (err, content) => {
    if (err) return console.log('Error loading client secret file:', pathToCredentials);
    authorize(JSON.parse(content));
  });
};

const getMessageById = async id => {
  const auth = CLIENT;
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  const data = await gmail.users.messages.get({
    userId: 'me',
    id
  });
  const extractedEmail = emailUtils.extractEmail(data);
  const validate = validateUtils.validate(data);

  if (validate === 'ibooks') {
    return _objectSpread({
      extractedEmail
    }, htmlUtils.extractAll(data));
  }

  if (validate === 'litres') {
    var _data$data$payload$pa;

    const attachmentId = (_data$data$payload$pa = data.data.payload.parts[1].body) === null || _data$data$payload$pa === void 0 ? void 0 : _data$data$payload$pa.attachmentId;
    const attachment = await gmail.users.messages.attachments.get({
      userId: 'me',
      messageId: id,
      id: attachmentId
    });
    return _objectSpread({
      extractedEmail
    }, txtUtils.extractAll(data, attachment));
  }

  return validate;
};

const deleteMessageById = async id => {
  const auth = CLIENT;
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  await gmail.users.messages.trash({
    userId: 'me',
    id
  });
};

const listMessages = async () => {
  var _data$data;

  const auth = CLIENT;
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  const data = await gmail.users.messages.list({
    userId: 'me'
  });

  if ((_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.messages) {
    return data.data.messages.map(m => m.id);
  }

  console.log('No new messages');
  return [];
};

const newMessageEvent = async () => {
  try {
    console.log('Checking inbox');
    const messages = await listMessages();

    if (messages.length) {
      const getMessageQueue = [];
      const updatingQueue = [];
      const deletingQueue = [];
      messages.forEach(m => {
        getMessageQueue.push(getMessageById(m));
      });
      const data = await Promise.all(getMessageQueue);
      data.forEach(d => {
        if (d !== 'empty') {
          updatingQueue.push(updateService.start(d));
        } else {
          console.log('empty');
        }
      });
      await Promise.all(updatingQueue);
      messages.forEach(m => {
        deletingQueue.push(deleteMessageById(m));
      });
      await Promise.all(deletingQueue);
    }
  } catch (error) {
    console.log('Error occurred', error);
  } finally {
    console.log('Event ended');
  }
};

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent,
  init,
  deleteMessageById
};
},{"../utils":"utils/index.js","./update.service":"services/update.service.js"}],"services/notes.service.js":[function(require,module,exports) {
const db = require("../db");

async function getRandomNotes(data, amount) {
  const markAsSeenQueue = []; // fallback when amount of notes less than needed amount

  if (data.length <= amount) {
    for (let i = 0; i < data.length; i += 1) {
      markAsSeenQueue.push(db.markAsSeen(data[i].note_id));
    }

    await Promise.all(markAsSeenQueue);
    return data;
  }

  const usedIndexes = new Set();

  for (let i = 0; i < amount; i += 1) {
    let repeatedIndex = true;
    let newRandomIndex;

    while (repeatedIndex) {
      newRandomIndex = Math.floor(Math.random() * data.length);

      if (!usedIndexes.has(newRandomIndex)) {
        repeatedIndex = false;
        usedIndexes.add(newRandomIndex);
        markAsSeenQueue.push(db.markAsSeen(data[newRandomIndex].note_id));
      }
    }
  }

  await Promise.all(markAsSeenQueue);
  const newData = [];
  usedIndexes.forEach(i => {
    newData.push(data[i]);
  });
  return newData;
}

async function getNotes(id) {
  const amount = await db.getAmount(id);
  let data = await db.getNotes(id);

  if (data.length < amount) {
    await db.resetSeenFlag(id);
    data = await db.getNotes(id);
  }

  const randomNotes = await getRandomNotes(data, amount);
  return randomNotes;
}

async function getNotesWithTags(notes) {
  const noteWithTags = [...notes];
  const tagQueue = [];
  notes.forEach(note => {
    tagQueue.push(db.getTagNotes(note.note_id));
  });
  const tags = await Promise.all(tagQueue);
  tags.forEach((t, i) => {
    noteWithTags[i].tags = t;
  });
  return noteWithTags;
}

module.exports = {
  getNotes,
  getNotesWithTags
};
},{"../db":"db/index.js"}],"services/info.service.js":[function(require,module,exports) {
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable object-curly-newline */

/* eslint-disable camelcase */
const db = require("../db");

async function getInitInfo(id) {
  const tags = await db.getAllTags(id);
  const allAccountInfo = await db.getAccountInfo(id);

  const _allAccountInfo$ = allAccountInfo[0],
        {
    user_id,
    createdat,
    email
  } = _allAccountInfo$,
        accountInfo = _objectWithoutProperties(_allAccountInfo$, ["user_id", "createdat", "email"]);

  const latestBooks = await db.getLatestBooks(id);
  return {
    tags,
    accountInfo,
    latestBooks
  };
}

module.exports = {
  getInitInfo
};
},{"../db":"db/index.js"}],"services/register.service.js":[function(require,module,exports) {
/* eslint-disable object-curly-newline */

/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");

const {
  v4: uuidv4
} = require("uuid");

const jwt = require("jsonwebtoken");

const db = require("../db");

async function register(payload) {
  try {
    const findResults = await db.getIdByEmail(payload.email);

    if (findResults !== "") {
      throw new Error("Not valid");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(payload.password, salt);
    const newUserId = uuidv4();
    await db.addUser(newUserId, payload.email, hashPassword);
    const token = jwt.sign({
      id: newUserId
    }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    return "Not valid";
  }
}

module.exports = {
  register
};
},{"../db":"db/index.js"}],"services/login.service.js":[function(require,module,exports) {
/* eslint-disable object-curly-newline */

/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../db");

async function login(payload) {
  try {
    const findResults = await db.getIdPasswordByEmail(payload.email);

    if (findResults === "") {
      throw new Error("not valid");
    }

    const isValid = await bcrypt.compare(payload.password, findResults.password);

    if (!isValid) {
      throw new Error("not valid");
    }

    const token = jwt.sign({
      id: findResults.user_id
    }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    return "Not valid";
  }
}

module.exports = {
  login
};
},{"../db":"db/index.js"}],"services/tags.service.js":[function(require,module,exports) {
/* eslint-disable object-curly-newline */

/* eslint-disable camelcase */
const db = require("../db");

async function addExistingTag(payload) {
  try {
    await db.addExistingTag(payload.tag_id, payload.note_id);
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  addExistingTag
};
},{"../db":"db/index.js"}],"services/index.js":[function(require,module,exports) {
const messagesService = require("./messages.service");

const notesService = require("./notes.service");

const updateService = require("./update.service");

const infoService = require("./info.service");

const registerService = require("./register.service");

const loginService = require("./login.service");

const tagsService = require("./tags.service");

module.exports = {
  messagesService,
  notesService,
  updateService,
  infoService,
  tagsService,
  loginService,
  registerService
};
},{"./messages.service":"services/messages.service.js","./notes.service":"services/notes.service.js","./update.service":"services/update.service.js","./info.service":"services/info.service.js","./register.service":"services/register.service.js","./login.service":"services/login.service.js","./tags.service":"services/tags.service.js"}],"controllers/messages.controller.js":[function(require,module,exports) {
const {
  messagesService
} = require('../services');

const getMessageById = async (_, res) => {
  const message = await messagesService.getMessageById('17502beb3b41933c');
  res.json(message);
};

const listMessages = async (_, res) => {
  const messages = await messagesService.listMessages();
  res.json(messages);
};

const newMessageEvent = async (req, res) => {
  await messagesService.newMessageEvent(req.body);
  res.sendStatus(200);
};

module.exports = {
  getMessageById,
  listMessages,
  newMessageEvent
};
},{"../services":"services/index.js"}],"controllers/notes.controller.js":[function(require,module,exports) {
const {
  notesService
} = require("../services");

const getDailyNotes = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const notes = await notesService.getNotes(req.user.id);
  const notesWithTags = await notesService.getNotesWithTags(notes);
  res.json(notesWithTags);
};

module.exports = {
  getDailyNotes
};
},{"../services":"services/index.js"}],"controllers/info.controller.js":[function(require,module,exports) {
const {
  infoService
} = require("../services");

const getInitInfo = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const info = await infoService.getInitInfo(req.user.id);
  res.json(info);
};

module.exports = {
  getInitInfo
};
},{"../services":"services/index.js"}],"controllers/register.controller.js":[function(require,module,exports) {
const {
  registerService
} = require("../services");

const register = async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  const token = await registerService.register(req.body);

  if (token === "Not valid") {
    res.status(400).send("Not valid");
  } else {
    res.json(token);
  }
};

module.exports = {
  register
};
},{"../services":"services/index.js"}],"controllers/login.controller.js":[function(require,module,exports) {
/* eslint-disable operator-linebreak */
const {
  loginService
} = require("../services");

const login = async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  const token = await loginService.login(req.body);

  if (token === "Not valid") {
    res.status(400).send("Not valid");
  } else {
    res.json(token);
  }
};

module.exports = {
  login
};
},{"../services":"services/index.js"}],"controllers/tags.controller.js":[function(require,module,exports) {
const {
  tagsService
} = require("../services");

const addExistingTag = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    await tagsService.addExistingTag(req.body);
    res.status(201).send("Added existing tag");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  addExistingTag
};
},{"../services":"services/index.js"}],"controllers/index.js":[function(require,module,exports) {
const messages = require("./messages.controller");

const notes = require("./notes.controller");

const info = require("./info.controller");

const register = require("./register.controller");

const login = require("./login.controller");

const tags = require("./tags.controller");

module.exports = {
  notes,
  messages,
  info,
  login,
  register,
  tags
};
},{"./messages.controller":"controllers/messages.controller.js","./notes.controller":"controllers/notes.controller.js","./info.controller":"controllers/info.controller.js","./register.controller":"controllers/register.controller.js","./login.controller":"controllers/login.controller.js","./tags.controller":"controllers/tags.controller.js"}],"routes/index.js":[function(require,module,exports) {
/* eslint-disable object-curly-newline */
const express = require("express");

const verify = require("./verifyToken");

const {
  messages,
  notes,
  info,
  register,
  login,
  tags
} = require("../controllers");

const router = express.Router();
router.get("/message", messages.getMessageById);
router.get("/allMessages", messages.listMessages);
router.get("/getDailyNotes", verify, notes.getDailyNotes);
router.get("/getInitInfo", verify, info.getInitInfo);
router.post("/addExistingTag", verify, tags.addExistingTag);
router.post("/post", messages.newMessageEvent);
router.post("/register", register.register);
router.post("/login", login.login);
module.exports = router;
},{"./verifyToken":"routes/verifyToken.js","../controllers":"controllers/index.js"}],"index.js":[function(require,module,exports) {
require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

const routes = require('./routes');

const {
  messagesService
} = require('./services'); // const { notesService } = require('./services');


const db = require('./db');

const init = async () => {
  app.use(express.json());
  app.use('/api', routes);
  app.use(cors()); // TODO configure before deployment

  await messagesService.init();
  await db.init(); // console.log(await notesService.getNotes(1, 3));

  const PORT = process.env.PORT || 3000;
  app.get('*', (_, res) => {
    res.send('hey');
  });
  app.listen(PORT, async () => {
    console.log('Server has been started on port 3000...');
    await messagesService.newMessageEvent();
  });
};

init();
},{"./routes":"routes/index.js","./services":"services/index.js","./db":"db/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map