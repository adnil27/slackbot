import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

import { logger } from '../utils/logger.js';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

const postReply = (app, message, context, introduction, solution, question) => {
  try {
    app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      thread_ts: message.ts,
      text: ' ',
      blocks: [
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: introduction + `<@${message.user}>`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: solution
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: question
          }
        },
        {
          type: 'divider'
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
};

export const messageWithButtonsController = (app) => {
  for (const res of messageConfig.replies) {
    const caseCheckMessage = new RegExp(res.message, 'i');
    const caseCheckAction = new RegExp(res.action, 'i');

    app.message(caseCheckMessage, ({ message, context }) => {
      let ignoreMessage = false;
      if (!message.text.match(caseCheckAction)) return;
      if (message.channel !== res.onlyChannel) return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) ignoreMessage = true;
        }
      }
      !ignoreMessage
        ? postReply(app, message, context, res.introduction, res.solution, res.question, res.actionId, res.actionId1)
        : logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
    });
  }
};
