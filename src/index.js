// import utils
import dotenv from 'dotenv';

import { messageController } from './listeners/messages/messages.js';

import { messageWithResolution } from './listeners/messages/messagesWithHowToSolve.js';

import { botAddsReactions } from './listeners/events/botAddsReactions.js';

import { botRemovesReactions } from './listeners/events/botRemovesReactions.js';

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
  messageWithResolution(app);
  botAddsReactions(app);
  botRemovesReactions(app);

  const port = 3000;
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
