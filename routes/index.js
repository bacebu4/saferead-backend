/* eslint-disable object-curly-newline */
const express = require("express");

const { messages } = require("../controllers");

const router = express.Router();

router.post("/post", messages.newMessageEvent);

module.exports = router;
