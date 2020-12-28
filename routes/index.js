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
  comments,
  books,
} = require("../controllers");

const router = express.Router();

router.get("/message", messages.getMessageById);

router.get("/allMessages", messages.listMessages);

router.get("/getDailyNotes", verify, notes.getDailyNotes);

router.get("/note/:id", notes.getNote);

router.post("/getNotesByBook", verify, notes.getNotesByBook);

router.post("/getNotesByTag", verify, notes.getNotesByTag);

router.post("/searchNotes", verify, notes.searchNotes);

router.delete("/deleteNote", verify, notes.deleteNote);

router.put("/updateNote", verify, notes.updateNote);

router.post("/addComment", verify, comments.addComment);

router.delete("/deleteComment", verify, comments.deleteComment);

router.put("/updateComment", verify, comments.updateComment);

router.get("/getInitInfo", verify, info.getInitInfo);

router.post("/addExistingTag", verify, tags.addExistingTag);

router.post("/addNewTag", verify, tags.addNewTag);

router.delete("/deleteTagFromNote", verify, tags.deleteTagFromNote);

router.delete("/deleteTag", verify, tags.deleteTag);

router.put("/updateTag", verify, tags.updateTag);

router.delete("/deleteBook", verify, books.deleteBook);

router.post("/post", messages.newMessageEvent);

router.post("/register", register.register);

router.post("/login", login.login);

module.exports = router;
