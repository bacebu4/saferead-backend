/* eslint-disable object-curly-newline */
const express = require("express");
const verify = require("./verifyToken");

const {
  messages,
  notes,
  info,
  register,
  login,
  tags,
} = require("../controllers");

const router = express.Router();

router.get("/message", messages.getMessageById);

router.get("/allMessages", messages.listMessages);

router.get("/getDailyNotes", verify, notes.getDailyNotes);

router.get("/getInitInfo", verify, info.getInitInfo);

router.post("/addExistingTag", verify, tags.addExistingTag);

router.post("/addNewTag", verify, tags.addNewTag);

router.delete("/deleteTagFromNote", verify, tags.deleteTagFromNote);

router.post("/post", messages.newMessageEvent);

router.post("/register", register.register);

router.post("/login", login.login);

module.exports = router;
