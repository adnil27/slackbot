export const postReplyWithSolvedStatus = (app, message, context, action, reply, introduction, solution, extraInformation, isSolved, complete) => {
  try {
    app.client.chat.update({
      token: context.botToken,
      channel: action.channel,
      as_user: true,
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
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: complete
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Reopen',
              emoji: true
            },
            value: 'click_me_123',
            action_id: 'button-action'
          }
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
};
