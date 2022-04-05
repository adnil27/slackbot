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
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
};
