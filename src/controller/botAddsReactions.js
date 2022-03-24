import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';
import { messageWithReactions } from './messagesWithReactions.js';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

export const botAddsReaction = (app) => {
  for (const res of messageConfig.replies) {
    app.event('reaction_added', async ({ event, context, message, body }) => {
      console.log(event);
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
