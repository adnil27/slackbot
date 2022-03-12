import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';
import { logger } from '../utils/logger.js';

const botRespondsToMessage = YAML.parse(fs.readFileSync('./config/messages.yml', 'utf8'));

const postReply = (app, message, context, reply) => {
  try {
    app.client.chat.postEphemeral({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      text: reply
    });
  } catch (e) {
    console.log(e);
  }
};

export const botRespondsToAnyMessage = (app) => {
  for (const res of botRespondsToMessage.replies) {
    const watchFor = res.message;
    const reply = res.reply;
    app.message(watchFor, ({ message, context }) => {
      let ignoreMessage = false;
      if (message.channel !== 'C034H2X55D4') return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) {
            ignoreMessage = true;
          }
        }
      }
      if (!ignoreMessage) {
        postReply(app, message, context, reply);
      } else {
        logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
      }
    });
  }
};
