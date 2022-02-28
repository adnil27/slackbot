const { App } = require("@slack/bolt");
const fs = require('fs')
let raw = fs.readFileSync('db.json');
let psbotcommands= JSON.parse(raw);

let raw2 = fs.readFileSync('psGuidelines.json');
let psGuidelines= JSON.parse(raw2);

let raw3 = fs.readFileSync('reactions.json');
let reactions= JSON.parse(raw3);

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true,
  appToken: process.env.APP_TOKEN
});

app.event("reaction_added", async ({ context, event, item}) => {
  if (event.reaction == "white_check_mark"  && event.item.channel == "C034H2X55D4"){
    try {
      const command = event.text;
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: 'C034QGR0X6Z',
        text: `:white_check_mark: Fantastic! Another query resolved by <@${event.user}>`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  }
});

app.event("reaction_removed", async ({ context, event}) => {
  if (event.reaction == "white_check_mark" && event.item.channel == "C034H2X55D4"){
    try {
      const command = event.text;
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: 'C034QGR0X6Z',
        text: `:white_check_mark: Removed`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  }
});

app.event("reaction_added", async ({ context, event}) => {
  if (event.reaction == "warning" && event.item.channel == "C034H2X55D4"){
    try {
      const command = event.text;
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: 'C034QGR0X6Z',
        text: `:warning: Oops looks like we are missing some information.`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  }
});

app.event("reaction_removed", async ({ context, event}) => {
  if (event.reaction == "warning" && event.item.channel == "C034H2X55D4"){
    try {
      const command = event.text;
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: 'C034QGR0X6Z',
        text: `:warning: Removed`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
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
  say({ text: `Hey! <@${message.user}> :wave: While you are waiting for one of the PS team to get back to you, why don't you try typing '/help' into a direct message to your *Slackbot* to see how I can help you. :nerd_face:\n\n:pray: Please don't type '/help' in *#product-support*. The message will be visible to *everyone* :flushed:`, thread_ts: message.ts });
});


app.message(/treatwell.lightning.force.com/i, ({ message, say }) => {
  say({ text: `Hey! <@${message.user}> :wave: Could you double check that you have included the Iglu link, pretty please with a :cherries: on top?`, thread_ts: message.ts });
});

app.event('app_home_opened', ({ event, say }) => {  
  say(`Hello! :wave: <@${event.user}>!`);
});

app.event("member_joined_channel", async ({ context, event }) => {
  try {
    const command = event.text;
    let reply;
    reply = `Hey! <@${event.user}> :wave: Welcome to *#product-support* Type '/product-support' into a direct message to your *Slackbot* to see our channel guidelines.\n\n:pray: Please don't type '/product-support' in the *#product-support* channel. The message will be seen by *everyone* :flushed:`;
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

app.command("/psbotcommands", async ({ command, ack, say }) => {
  try {
    await ack();
    let message = { blocks: [] };
    psbotcommands.data.map((bot) => {
      message.blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: bot.header,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: bot.content,
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

app.command("/product-support", async ({ command, ack, say }) => {
  try {
    await ack();
    let message = { blocks: [] };
    psGuidelines.data.map((bot) => {
      message.blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: bot.header,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: bot.content,
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





module.exports = app;