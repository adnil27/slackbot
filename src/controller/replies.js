import { logger } from '../utils/logger.js';
import fs from 'fs';
import YAML from 'yaml';
import { resolution } from '../blocks/resolution.js'

const replyConfig = YAML.parse(fs.readFileSync('./config/replies.yml', 'utf8'));
let validMessage = false;
let block;

const postReply = (app, message, context, reply, block) => {
  try {
    app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      thread_ts: message.ts,
      text: reply,
      blocks: block
    });
  } catch (e) {
    console.log(e);
  }
};

const ignoreIfContains = (replyConfig, message) => {
  for (const ignore of replyConfig) {
    const regex = new RegExp(ignore, 'i');
    if (regex.test(message.text)) validMessage = false;
  }
};

export const replies = (app) => {
  for (const conf of replyConfig.replies) {
    const match = new RegExp(conf.message, 'i');
    console.log(match);
    app.message(match, ({ message, context }) => {
      if (message.user === conf.psTeamUsers) return;
      if (message.channel !== conf.onlyChannel) return;
      // if (message.text === conf.ifContains) ifContains(conf.ifContains, message);
      // if (conf.ignoreIfContains) ignoreIfContains(conf.ignoreIfContains, message);
      if (conf.ifContains) {
        for (const contains of conf.ifContains) {
          const regex = new RegExp(contains, 'i');
          if (regex.test(message.text)) validMessage = true;
        }
      }
      if (conf.block) block = resolution(conf.reply, conf.introduction, conf.solution, conf.extraInformation, conf.isSolved, message);

      !validMessage
        ? postReply(app, message, context, conf.reply, block)
        : logger('info', 'This message was not valid');
    });
  }
};
