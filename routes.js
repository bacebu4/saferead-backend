/* eslint-disable object-curly-newline */
const express = require("express");

const { gmail } = require("./controllers");

const router = express.Router();

router.post("/post", gmail.newMessageEvent);

module.exports = router;
