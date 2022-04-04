import { logger } from '../utils/logger.js';

import { messageConfig } from './messageConfig.js';

import { postReplyWithResolution } from './postReplyWithResolution.js';

export const messageWithReactions = (app) => {
  for (const res of messageConfig.replies) {
    const matchMessage = new RegExp(res.message, 'i');
    const matchAction = new RegExp(res.ifContains, 'i');
    const matchIgnoreIfContains = new RegExp(res.ignoreIfContains, 'i');

    app.message(matchMessage, ({ message, context }) => {
      if (message.user === res.psTeamUsers) return;
      if (message.channel !== res.onlyChannel) return;
      if (!message.text.match(matchAction)) return;
      if (!message.text.match(matchIgnoreIfContains)) {
        postReplyWithResolution(app, message, context, res.introduction, res.solution, res.greeting, res.extraInformation, res.isSolved);
      }
    });
  }
};
