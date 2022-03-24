import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithReactions.yml', 'utf8'));

export const botAddsReactions = (app) => {
  for (const res of messageConfig.replies) {
    const caseCheckMessage = new RegExp(res.message, 'i');
    const caseCheckAction = new RegExp(res.action, 'i');

    app.event('reaction_added', async ({ event, context }) => {
      const messageID = event.item.ts;
      const channelID = event.item.channel;

      const result = await app.client.conversations.history({
        channel: channelID,
        latest: messageID,
        inclusive: true,
        limit: 1
      });

      const messageResult = result.messages[0];

      if (!messageResult.text.match(caseCheckMessage)) return;
      if (!messageResult.text.match(caseCheckAction)) return;

      if (event.user === res.psTeamUsers) return;
      if (event.reaction === res.reactionAdded && event.item.channel === res.onlyChannel) {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: event.item.channel,
          user: event.user,
          thread_ts: event.item.ts,
          text: res.reactionAddedGreeting + `<@${event.user}>` + res.reactionAddedReply
        });
        app.client.reactions.add({
          name: res.reaction1ToAdd,
          timestamp: event.item.ts,
          channel: event.item.channel
        });
        app.client.reactions.add({
          name: res.reaction2ToAdd,
          timestamp: event.item.ts,
          channel: event.item.channel
        });
      }
    });
  }
};
