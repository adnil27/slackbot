// Import slack bot dependancies
const { WebClient, LogLevel } = require("@slack/web-api");
require('botkit');

// import envrionemnt variables (secrets)
require("dotenv").config();

const app = require("./src/response");

// Start slack webclient
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();