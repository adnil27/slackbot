import { messageConfig } from '../../utils/messageConfig.js';

export const botRemovesReactions = (app) => {
  for (const res of messageConfig.replies) {
    const matchMessage = new RegExp(res.message, 'i');
    const matchIgnoreIfContains = new RegExp(res.ignoreIfContains, 'i');
    const matchIfContains = new RegExp(res.ifContains, 'i');

    app.event('reaction_removed', async ({ event, context }) => {
      const messageID = event.item.ts;
      const channelID = event.item.channel;

      const result = await app.client.conversations.history({
        channel: channelID,
        latest: messageID,
        inclusive: true,
        limit: 1
      });

      const messageResult = result.messages[0];

      if (!messageResult.text.match(matchMessage)) return;
      if (!messageResult.text.match(matchIfContains)) return;
      if (messageResult.text.match(matchIgnoreIfContains)) return;

      if (event.user === res.psTeamUsers) return;
      if (event.reaction === res.reactionAdded && event.item.channel === res.onlyChannel) {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: event.item.channel,
          user: event.user,
          thread_ts: event.item.ts,
          text: res.reactionRemovedGreeting + `<@${event.user}>` + res.reactionRemovedReply
        });
        app.client.reactions.remove({
          name: res.reaction1ToAdd,
          timestamp: event.item.ts,
          channel: event.item.channel
        });
        app.client.reactions.remove({
          name: res.reaction2ToAdd,
          timestamp: event.item.ts,
          channel: event.item.channel
        });
      }
    });
  }
};
