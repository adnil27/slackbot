import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

export const botAddsReaction = (app) => {
  for (const res of messageConfig.replies) {
    app.action(res.actionId, ({ ack, action, body, respond, message }) => {
      try {
        ack();
        respond({
          replace_original: true,
          user: action.user,
          text: res.actionIdReply
        });
      } catch (error) {
        console.log('err');
        console.error(error);
      }
    });
  }
  app.event('message', async ({ event, client }) => {
    try {
      const result = await app.client.conversations.history({
        channel: event.channel,
        latest: event.ts,
        inclusive: true,
        limit: 1
      });

      const message = result.messages[0];
      console.log('message:', message);

      const messageId = message.ts;
      app.client.reactions.add({
        name: 'white_check_mark',
        timestamp: messageId,
        channel: 'C034H2X55D4'
      });
      console.log(messageId);
    } catch (e) {
      console.log('error', e);
    }
  });
};
