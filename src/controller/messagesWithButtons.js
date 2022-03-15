import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';
import { logger } from '../utils/logger.js';

const messageConfig = YAML.parse(fs.readFileSync('./config/messagesWithButtons.yml', 'utf8'));

const postReply = (app, message, context, introduction, solution, question) => {
  try {
    app.client.chat.postEphemeral({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      text: ' ',
      blocks: [
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: introduction
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: solution
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: question
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'actions',
          elements: [
            {
              style: 'primary',
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Yes',
                emoji: true
              },
              value: 'click_me_123',
              action_id: 'actionId-0'
            },
            {
              style: 'danger',
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'No',
                emoji: true
              },
              value: 'click_me_123',
              action_id: 'actionId-1'
            }
          ]
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
};

export const messageWithButtonsController = (app) => {
  for (const res of messageConfig.replies) {
    const caseCheckMessage = new RegExp(res.message + ' ' + res.keyword, 'i');
    console.log(caseCheckMessage);
    app.message(caseCheckMessage, ({ message, context }) => {
      let ignoreMessage = false;
      if (message.channel !== res.onlyChannel) return;
      if (res.ignoreIfContains) {
        for (const ignore of res.ignoreIfContains) {
          const regex = new RegExp(ignore, 'i');
          if (regex.test(message.text)) ignoreMessage = true;
        }
      }
      !ignoreMessage
        ? postReply(app, message, context, res.introduction, res.solution, res.question)
        : logger('info', 'This message was ignored as it matched an ignoreIfContains regex test');
    });
  }
};
