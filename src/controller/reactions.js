import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

export const botAddsReaction = (app) => {
  app.event('reaction_added', async ({ event, client }) => {
    console.log('yay');
  });
};
