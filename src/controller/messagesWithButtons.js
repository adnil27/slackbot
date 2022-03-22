import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

import { logger } from '../utils/logger.js';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

const postReply = (app, message, context, introduction, solution, question, actionId, actionId1) => {
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
            text: introduction
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
    const caseCheckMessage = '';

    app.message(caseCheckMessage, ({ message, context }) => {
      const result = caseCheckMessage.toLowerCase();
      if (!result === res.message) return;
      let ignoreMessage = false;
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
