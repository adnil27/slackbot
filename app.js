const { App } = require("@slack/bolt");
require("dotenv").config();
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN
});

app.message("hey", async ({ command, say }) => {
  try {
    say("Yaaay! that command works!");
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.message(/treatwell.lightning.force.com/, async ({ command, say }) => {
  try {
    say("Please check that you have included the Iglu link");
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();