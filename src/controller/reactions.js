import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

export const botAddsReaction = (app) => {
  for (const res of messageConfig.replies) {
    app.action(res.actionId, ({ ack, action, respond }) => {
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
    app.action(res.actionId1, ({ ack, action, respond }) => {
      try {
        ack();
        respond({
          replace_original: true,
          user: action.user,
          text: res.actionId1Reply
        });
      } catch (error) {
        console.log('err');
        console.error(error);
      }
    });
  }
};
