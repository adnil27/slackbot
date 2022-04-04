import { logger } from '../utils/logger.js';

import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messages.yml', 'utf8'));

const postReply1 = (app, message, context, reply) => {
  try {
    app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      thread_ts: message.ts,
      text: reply
    });
  } catch (e) {
  }
};

export const messageController = (app) => {
  for (const res of messageConfig.replies) {
    const caseCheck = new RegExp(res.message, 'i');
    app.message(caseCheck, ({ message, context }) => {
      let ignoreMessage = false;
      if (message.user === res.psTeamUsers) return;
      if (message.channel !== res.onlyChannel) return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) ignoreMessage = true;
        }
      }
      !ignoreMessage
        ? postReply1(app, message, context, res.reply)
        : logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
    });
  }
};
