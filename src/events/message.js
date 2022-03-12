import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const botRespondsToMessage = YAML.parse(fs.readFileSync('./config/messageReplies.yml', 'utf8'));

const postReply = (app, message, context, reply) => {
  try {
    app.client.chat.postEphemeral({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      text: reply
    });
  } catch (e) {
    console.log(e);
  }
};

export const botRespondsToAnyMessage = (app) => {
  for (const res of botRespondsToMessage.replies) {
    const watchFor = res.message;
    const reply = res.reply;
    let ignoreMessage = false;
    console.log('test');
    console.log(res.ignoreIfContains);
    app.message(watchFor, ({ message, context }) => {
      if (message.channel !== 'C034H2X55D4') return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          console.log(ignore);
          const regex = new RegExp(ignore, 'i');
          console.log(regex);
          if (regex.test(message.text)) {
            ignoreMessage = true;
          }
        }
      }
      if (!ignoreMessage) postReply(app, message, context, reply);
    });
  }
};
