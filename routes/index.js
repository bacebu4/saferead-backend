const express = require("express");

const { messages, notes, info } = require("../controllers");

const router = express.Router();

router.get("/message", messages.getMessageById);

router.get("/allMessages", messages.listMessages);

router.get("/getDailyNotes", notes.getDailyNotes);

router.get("/getInitInfo", info.getInitInfo);

router.post("/post", messages.newMessageEvent);

module.exports = router;
