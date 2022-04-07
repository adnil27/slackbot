export const postReplyWithResolution = (app, message, context, reply, introduction, solution, extraInformation, isSolved) => {
  try {
    app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      user: message.user,
      thread_ts: message.ts,
      text: ' ',
      blocks: [
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: reply + `<@${message.user}>` + introduction
          }
        },
        {
          type: 'divider'
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
            text: extraInformation
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: isSolved
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
              action_id: 'yes_button'
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
              action_id: 'no_button'
            }
          ]
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
};
