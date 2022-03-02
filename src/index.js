// import utils
import dotenv from 'dotenv';
dotenv.config();

import {
  queryResolvedByUser,
  queryReopenedByUser,
  queryNotEnoughInfo,
  queryNotEnoughInfoRemoved,
} from './events/reactions.js';
import {
  newMemberJoinedChannel
} from "./events/members.js";
import {
  memberMentionsBot
} from "./events/mentions.js"

import {
  botRespondsToHelloMessage,
  botRespondsToSalesforceMessage
} from "./events/messages.js"

// slack deps
import SlackBolt from '@slack/bolt';
const { App } = SlackBolt;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true,
  appToken: process.env.APP_TOKEN
});

(async () => {
  // Reactions
  queryResolvedByUser(app)
  queryReopenedByUser(app)
  queryNotEnoughInfo(app)
  queryNotEnoughInfoRemoved(app)
  // members
  newMemberJoinedChannel(app)
  // app (bot) mentions
  memberMentionsBot(app)
  botRespondsToHelloMessage(app)
  botRespondsToSalesforceMessage(app)
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();