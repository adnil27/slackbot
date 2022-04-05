import { messageConfig } from '../../utils/messageConfig.js';

import { postReply } from '../../replies/postReply.js';

import { postReplyWithResolution } from '../../replies/postReplyWithResolution.js';

export const messageController = (app) => {
  for (const res of messageConfig.replies) {
    const matchMessage = new RegExp(res.message, 'i');
    const matchIgnoreIfContains = new RegExp(res.ignoreIfContains, 'i');
    const matchIfContains = new RegExp(res.ifContains, 'i');

    app.message(matchMessage, ({ message, context }) => {
      if (message.user === res.psTeamUsers) return;
      if (message.channel !== res.onlyChannel) return;
      if (message.text.match(matchIgnoreIfContains)) return;
      if (!res.solution) {
        postReply(app, message, context, res.reply, res.introduction);
      } else if (message.text.match(matchIfContains)) {
        postReplyWithResolution(app, message, context, res.reply, res.introduction, res.solution, res.extraInformation, res.isSolved);
      }
    });
  }
};
