// require the fs module that's built into Node.js
import fs from 'fs';
// get the raw data from the db.json file
const raw = fs.readFileSync('botRespondsToHelloMessage-topics.json');
// parse the raw bytes from the file as JSON
const topics = JSON.parse(raw);

// get the raw data from the db.json file
const raw1 = fs.readFileSync('botRespondsToHelloMessage-problemReport.json');
// parse the raw bytes from the file as JSON
const problemReportSelected = JSON.parse(raw1);

// get the raw data from the db.json file
const raw2 = fs.readFileSync('botRespondsToHelloMessage-pr-1.json');
// parse the raw bytes from the file as JSON
const problemReportSelected1 = JSON.parse(raw2);

export const botRespondsToHelloMessage = (app) => {
  app.message(/hey|hi|hello/, ({ message, say, context }) => {
    if (message.channel === 'C034H2X55D4' && message.thread === message.thread_ts) {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          attachments: [topics]
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
  app.action('static_select-action', async ({ ack, action, respond }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-0') {
      await respond({
        response_type: 'ephemeral',
        replace_original: false,
        user: action.user,
        attachments: [problemReportSelected]
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
  app.action('problem_report_selected', async ({ ack, action, respond, client }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-pr-0') {
      await respond({
        response_type: 'ephemeral',
        replace_original: false,
        user: action.user,
        attachments: [problemReportSelected1]
      });
    }
    if (action.selected_option.value === 'value-pr-1') {
      await respond({
        text: 'you selected value 1',
        response_type: 'ephemeral',
        replace_original: false,
        user: action.user
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
