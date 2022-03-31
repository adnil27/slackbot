import { logger } from '../utils/logger.js';

import { messageConfig } from './messageConfig.js';

const postReply = (app, message, context, introduction, solution, greeting, extraInformation, isSolved) => {
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
            text: greeting + `<@${message.user}>` + introduction
          }
        },
        {
          type: 'divider'
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
            text: extraInformation
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: isSolved
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

export const messageWithReactions = (app) => {
  for (const res of messageConfig.replies) {
    const caseCheckMessage = new RegExp(res.message, 'i');
    const caseCheckAction = new RegExp(res.action, 'i');

    app.message(caseCheckMessage, ({ message, context }) => {
      let ignoreMessage = false;
      if (message.user === res.psTeamUsers) return;
      if (!message.text.match(caseCheckAction)) return;
      if (message.channel !== res.onlyChannel) return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) ignoreMessage = true;
        }
      }
      console.log('hello');
      !ignoreMessage
        ? postReply(app, message, context, res.introduction, res.solution, res.greeting, res.extraInformation, res.isSolved)
        : logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
    });
  }
};
