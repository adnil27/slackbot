// require the fs module that's built into Node.js
import fs from 'fs';
// get the raw data from the db.json file
const raw = fs.readFileSync('./botRespondsToHelloMessage/staticSelectAction.json');
// parse the raw bytes from the file as JSON
const staticSelectAction = JSON.parse(raw);

// get the raw data from the db.json file
const raw1 = fs.readFileSync('./botRespondsToHelloMessage/value0Selected.json');
// parse the raw bytes from the file as JSON
const value0Selected = JSON.parse(raw1);

// get the raw data from the db.json file
const raw2 = fs.readFileSync('./botRespondsToHelloMessage/value00Selected.json');
// parse the raw bytes from the file as JSON
const value00Selected = JSON.parse(raw2);

// get the raw data from the db.json file
const raw3 = fs.readFileSync('./botRespondsToHelloMessage/value0000Selected.json');
// parse the raw bytes from the file as JSON
const value000Selected = JSON.parse(raw3);

// get the raw data from the db.json file
const raw4 = fs.readFileSync('./botRespondsToHelloMessage/value0000Selected.json');
// parse the raw bytes from the file as JSON
const value0000Selected = JSON.parse(raw4);

export const botRespondsToHelloMessage = (app) => {
  app.message(/hey|hi|hello/, ({ message, say, context }) => {
    if (message.channel === 'C034H2X55D4') {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          blocks: staticSelectAction.blocks,
          text: staticSelectAction.text
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
  app.action('static_select_action', async ({ ack, action, respond }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-0') {
      await respond({
        response_type: 'ephemeral',
        replace_original: false,
        user: action.user,
        attachments: [value0Selected]
      });
    }
    if (action.selected_option.value === 'value-1') {
      await respond({
        text: 'you selected value 1',
        response_type: 'ephemeral',
        replace_original: false,
        user: action.user
      });
    }
  });
  app.action('value0_selected', async ({ ack, action, respond, client }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-0') {
      await respond({
        response_type: 'ephemeral',
        replace_original: false,
        user: action.user,
        attachments: [value00Selected]
      });
    }
  });
  app.action('value0_0_selected', async ({ ack, action, respond, client }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-0') {
      await respond({
        response_type: 'ephemeral',
        replace_original: true,
        user: action.user,
        attachments: [value000Selected]
      });
    }
  });
  app.action('value0_0_0_selected', async ({ ack, action, respond, client }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-0') {
      await respond({
        response_type: 'ephemeral',
        replace_original: true,
        user: action.user,
        attachments: [value0000Selected]
      });
    }
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
