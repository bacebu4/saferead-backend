/* eslint-disable object-curly-newline */
const express = require("express");

const { messages, notes, info, register, login } = require("../controllers");

const router = express.Router();

router.get("/message", messages.getMessageById);

router.get("/allMessages", messages.listMessages);

router.get("/getDailyNotes", notes.getDailyNotes);

router.get("/getInitInfo", info.getInitInfo);

router.post("/post", messages.newMessageEvent);

router.post("/register", register.register);

router.post("/login", login.login);

module.exports = router;
