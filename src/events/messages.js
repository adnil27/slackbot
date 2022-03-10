// require the fs module that's built into Node.js
import fs from 'fs';

const firstQuestion = JSON.parse(fs.readFileSync('./botRespondsToHelloMessage/firstQuestion.json'));

const option1Option1 = JSON.parse(fs.readFileSync('./botRespondsToHelloMessage/option1-1.json'));

const option1Option1Option2 = JSON.parse(fs.readFileSync('./botRespondsToHelloMessage/option1-1-2.json'));

export const botRespondsToHelloMessage = (app) => {
  app.message(/hey|hi|hello/, ({ message, say, context }) => {
    if (message.channel === 'C034H2X55D4') {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          blocks: firstQuestion.blocks,
          text: firstQuestion.text
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });

  app.action('option1', async ({ ack, action, respond }) => {
    // Acknowledge the action
    await ack();
    await respond({
      response_type: 'ephemeral',
      replace_original: false,
      user: action.user,
      blocks: option1Option1.blocks,
      text: option1Option1.text
    });
  });

  app.action('option1_button2', async ({ ack, action, respond }) => {
    // Acknowledge the action
    await ack();
    console.log(option1Option1Option2.text);
    await respond({
      response_type: 'ephemeral',
      replace_original: false,
      user: action.user,
      blocks: option1Option1Option2.blocks,
      text: option1Option1Option2.text
    });
  });
};

export const botRespondsToSalesforceMessage = (app) => {
  app.message(/treatwell.lightning.force.com/i, ({ message, say }) => {
    const hasIgluLink = /tools.treatwell.net\/iglu/i.test(message.text);
    if (!hasIgluLink) {
      say({ text: `Hey! <@${message.user}> :wave: Could you double check that you have included the Iglu link, pretty please with a :cherries: on top?`, thread_ts: message.ts });
    }
  });
};
