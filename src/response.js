const { App } = require("@slack/bolt");
const fs = require('fs')
let raw = fs.readFileSync('db.json');
let faqs= JSON.parse(raw);

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true,
  appToken: process.env.APP_TOKEN
});

app.event("reaction_added", async ({ context, event }) => {
  try {
    const command = event.text;
    if (event == "question") {
      console.log ("it worked")
    }
    let reply;
    reply = `Fantastic! Another query resolved by <@${event.user}>`;
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: 'C034QGR0X6Z',
      text: `${reply}`,
    });
  } catch (e) {
    console.log(`error responding ${e}`);
  }
});

app.event("app_mention", async ({ context, event }) => {
  try {
    const command = event.text;
    let reply;
    reply = `Hello <@${event.user}> :wave: Looking for a little help? Type '/help' into a direct message to your *Slackbot* to see how I can help you. :nerd_face:\n\n:pray: Please don't type '/help' in *#product-support*. The message will be visible to *everyone* :flushed:`;
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `${reply}`,
      thread_ts: event.ts
    });
  } catch (e) {
    console.log(`error responding ${e}`);
  }
});

app.message(/hey|hi|hello/, ({ message, say }) => {
  console.debug(JSON.stringify(message));
  say({ text: `Hey! <@${message.user}> :wave: While you are waiting for one of the PS team to get back to you, why don't you try typing '/help' into a direct message to your *Slackbot* to see how I can help you. :nerd_face:\n\n:pray: Please don't type '/help' in *#product-support*. The message will be visible to *everyone* :flushed:`, thread_ts: message.ts });
});


app.message(/treatwell.lightning.force.com/i, ({ message, say }) => {
  console.debug(JSON.stringify(message));
  say({ text: `Hey! <@${message.user}> :wave: Could you double check that you have included the Iglu link, pretty please with a :cherries: on top?`, thread_ts: message.ts });
});

app.command("/help", async ({ command, ack, say }) => {
  try {
    await ack();
    let message = { blocks: [] };
    faqs.data.map((faq) => {
      message.blocks.push(
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: faq.content,
            },
          },
          {
            "type": "divider"
          },
      );
    });
    say(message);
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

app.event("member_joined_channel", async ({ context, event }) => {
  try {
    const command = event.text;
    let reply;
    reply = `Hey! <@${event.user}> :wave: Welcome to *#product-support* Type '/help' into a direct message to your *Slackbot* to see how I can help you!:nerd_face:\n\n:pray: Please don't type '/help' in *#product-support*. The message will be visible to *everyone* :flushed:`;
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `${reply}`,
      thread_ts: event.ts
    });
  } catch (e) {
    console.log(`error responding ${e}`);
  }
});

module.exports = app;