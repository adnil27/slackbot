import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';
import { logger } from '../utils/logger.js';

const messageConfig = YAML.parse(fs.readFileSync('./config/messages.yml', 'utf8'));

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

export const messageController = (app) => {
  for (const res of messageConfig.replies) {
    app.message(res.message, ({ message, context }) => {
      let ignoreMessage = false;
      if (message.channel !== res.onlyChannel) return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) ignoreMessage = true;
        }
      }
      !ignoreMessage
        ? postReply(app, message, context, res.reply)
        : logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
    });
  }
};
