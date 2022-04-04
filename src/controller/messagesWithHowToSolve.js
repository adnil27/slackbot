import { messageConfig } from './messageConfig.js';

import { postReplyWithResolution } from './postReplyWithResolution.js';

export const messageWithReactions = (app) => {
  for (const res of messageConfig.replies) {
    const matchMessage = new RegExp(res.message, 'i');
    const matchIgnoreIfContains = new RegExp(res.ignoreIfContains, 'i');
    const matchIfContains = new RegExp(res.ifContains, 'i');

    app.message(matchMessage, ({ message, context }) => {
      if (message.user === res.psTeamUsers) return;
      if (message.channel !== res.onlyChannel) return;
      if (message.text.match(matchIgnoreIfContains)) return;
      if (message.text.match(matchIfContains)) {
        postReplyWithResolution(app, message, context, res.reply, res.introduction, res.solution, res.extraInformation, res.isSolved);
      }
    });
  }
};
