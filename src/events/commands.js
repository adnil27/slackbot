// require the fs module that's built into Node.js
import fs from 'fs';
// get the raw data from the db.json file
const raw = fs.readFileSync('channel-guidelines.json');
// parse the raw bytes from the file as JSON
const channelGuidelines = JSON.parse(raw);

export const showChannelGuidelines = (app) => {
  app.command('/ps_channel_guidelines', async ({ command, ack, say }) => {
    try {
      await ack();
      const message = { blocks: [] };
      channelGuidelines.data.map((help) => {
        message.blocks.push(
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.header
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.content
            }
          }
        );
      });
      say(message);
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};

// get the raw data from the db.json file
const raw2 = fs.readFileSync('channel-help-commands.json');
// parse the raw bytes from the file as JSON
const channelHelpGuide = JSON.parse(raw2);

export const showHelpCommands = (app) => {
  app.command('/ps_help_commands', async ({ command, ack, say }) => {
    try {
      await ack();
      const message = { blocks: [] };
      channelHelpGuide.data.map((help) => {
        message.blocks.push(
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.header
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.content
            }
          }
        );
      });
      say(message);
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};

// get the raw data from the db.json file
const raw3 = fs.readFileSync('trouble-shooting-guide.json');
// parse the raw bytes from the file as JSON
const troubleShootingGuide= JSON.parse(raw3);

export const showTroubleShootingGuide = (app) => {
  app.command('/ps_trouble_shooting', async ({ command, ack, say }) => {
    try {
      await ack();
      const message = { blocks: [] };
      troubleShootingGuide.data.map((help) => {
        message.blocks.push(
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.header
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.content
            }
          }
        );
      });
      say(message);
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};
// get the raw data from the db.json file
const raw4 = fs.readFileSync('useful-links.json');
// parse the raw bytes from the file as JSON
const usefulLinks = JSON.parse(raw4);

export const showUsefulLinks = (app) => {
  app.command('/ps_useful_links', async ({ command, ack, say }) => {
    try {
      await ack();
      const message = { blocks: [] };
      usefulLinks.data.map((help) => {
        message.blocks.push(
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.header
            },
            accessory: {
              type: 'image',
              image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/kore-1YjNtFtJlMTaC26A/o.jpg',
              alt_text: 'alt text for image'
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: help.content
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: help.buttonText,
                emoji: true
              },
              value: 'click_me_123',
              url: help.url,
              action_id: 'button-action'
            }
          },
          {
            type: 'divider'
          }
        );
      });
      say(message);
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};
