import { logger } from '../utils/logger.js';

import { messageConfig } from './messageConfig.js';

import { postReplyWithResolution } from './postReplyWithResolution.js';

export const messageWithReactions = (app) => {
  for (const res of messageConfig.replies) {
    const caseCheckMessage = new RegExp(res.message, 'i');
    const caseCheckAction = new RegExp(res.action, 'i');

    app.message(caseCheckMessage, ({ message, context }) => {
      let ignoreMessage = false;
      if (message.user === res.psTeamUsers) return;
      if (!message.text.match(caseCheckMessage)) return;
      if (!message.text.match(caseCheckAction)) return;
      if (message.channel !== res.onlyChannel) return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) ignoreMessage = true;
        }
      }
      !ignoreMessage
        ? postReplyWithResolution(app, message, context, res.introduction, res.solution, res.greeting, res.extraInformation, res.isSolved)
        : logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
    });
  }
};
