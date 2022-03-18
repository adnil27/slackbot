import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

export const botAddsReaction = (app) => {
  for (const res of messageConfig.replies) {
    app.action(res.actionId, ({ ack, action, body, respond, message }) => {
      try {
        ack();
        app.client.reactions.add({
          name: res.reaction,
          timestamp: body.message.ts,
          channel: 'C034H2X55D4'
        });
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
};
