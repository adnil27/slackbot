// import utils
import dotenv from 'dotenv';

import { messageController } from './controller/messages.js';

import { messageWithReactions } from './controller/messagesWithReactions.js';

import { botAddsReactions } from './controller/botAddsReactions.js';

// slack deps
import SlackBolt from '@slack/bolt';
dotenv.config();
const { App } = SlackBolt;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN
});

(async () => {
  messageController(app);
  messageWithReactions(app);
  botAddsReactions(app);

  const port = 3000;
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
