const express = require('express')

const { messages } = require('../controllers')

const router = express.Router()

router.get('/message', messages.getMessageById)

router.get('/allMessages', messages.listMessages)

router.post('/post', messages.newMessageEvent)

module.exports = router