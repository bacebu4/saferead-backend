const express = require('express');

const app = express();
const cors = require('cors');
const routes = require('./routes');
const { messagesService } = require('./services');
const { notesService } = require('./services');
const db = require('./db');

const init = async () => {
  app.use(express.json());
  app.use('/api', routes);
  app.use(cors()); // TODO configure before deployment

  await messagesService.init();
  await db.init();
  console.log(await notesService.getNotes(1, 2));

  const PORT = process.env.PORT || 3000;

  app.get('*', (_, res) => {
    res.send('hey');
  });

  app.listen(PORT, async () => {
    console.log('Server has been started on port 3000...');
    // await messagesService.newMessageEventTest();
    console.log('the end of test event');
  });
};

init();
