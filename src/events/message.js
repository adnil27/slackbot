import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const botRespondsToMessage = YAML.parse(fs.readFileSync('./config/messageReplies.yml', 'utf8'));
Object.keys(botRespondsToMessage).forEach(key => {
  console.log(key);
  console.log(botRespondsToMessage[key]);
});
const indentedJson = JSON.stringify(botRespondsToMessage, null, 2);
console.log(indentedJson);

export const botRespondsToAnyMessage = (app) => {
  app.message('hi', ({ message, context }) => {
    if (message.channel === 'C034H2X55D4') {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          text: botRespondsToMessage.fruit,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: botRespondsToMessage.fruit.apple
              }
            }
          ]
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
};
