import { messageConfig } from '../../utils/messageConfig.js';

export const actionController = (app) => {
  for (const res of messageConfig.replies) {
    app.action('yes_button', async ({ ack, body, client, respond }) => {
      await ack();

      await respond({
        replace_original: true,
        user: body.user.id,
        text: ' ',
        blocks: [
          {
            type: 'divider'
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: res.reply + `<@${body.user.id}>` + res.introduction
            }
          },
          {
            type: 'divider'
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: res.solution
            }
          },
          {
            type: 'divider'
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: res.extraInformation
            }
          },
          {
            type: 'divider'
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: res.complete
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Reopen',
                emoji: true
              },
              value: 'click_me_123',
              action_id: 'reopen'
            }
          }
        ]
      });
    });
  }
};
