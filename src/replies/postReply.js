export const postReply = (app, message, context, reply, introduction) => {
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
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
};
