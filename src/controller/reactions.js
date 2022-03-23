import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

export const botAddsReaction = (app) => {
  for (const res of messageConfig.replies) {
    app.event('reaction_added', async ({ event, context, body, message }) => {
      if (event.user === res.psTeamUsers) return;
      if (event.reaction === res.reactionAdded && event.item.channel === res.onlyChannel) {
        console.log(event);
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: event.item.channel,
          user: event.user,
          thread_ts: event.item.ts,
          text: res.reactionAddedReply + `<@${event.user}>`
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
    app.event('reaction_removed', async ({ event, context, body, message }) => {
      if (event.user === res.psTeamUsers) return;
      if (event.reaction === res.reactionRemoved && event.item.channel === res.onlyChannel) {
        console.log(event);
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: event.item.channel,
          user: event.user,
          thread_ts: event.item.ts,
          text: res.reactionRemovedReply + `<@${event.user}>`
        });
        app.client.reactions.remove({
          name: res.reaction1ToRemove,
          timestamp: event.item.ts,
          channel: event.item.channel
        });
        app.client.reactions.remove({
          name: res.reaction2ToRemove,
          timestamp: event.item.ts,
          channel: event.item.channel
        });
      }
    });
  }
};
