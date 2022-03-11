import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const botRespondsToMessage = YAML.parse(fs.readFileSync('./config/messageReplies.yml', 'utf8'));
const reply = Object.keys(botRespondsToMessage).forEach(key => {
  console.log(key);
  console.log(botRespondsToMessage[key]);
});

export const botRespondsToAnyMessage = (app) => {
  app.message('', ({ message, context }) => {
    if (message.channel === 'C034H2X55D4' && message.text === botRespondsToMessage.useCase.text) {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          text: botRespondsToMessage.useCase.reply
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
      console.log(message);
    }
  });
};
