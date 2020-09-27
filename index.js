const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const { messagesService } = require('./services')

app.use(express.json())
app.use('/api', routes)
app.use(cors()) // TODO configure before deployment

messagesService.init()

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

app.get("*", (req, res) => {
  res.send('hey')
})

app.listen(PORT, async () =>  {
  console.log('Server has been started on port 3000...');
})

