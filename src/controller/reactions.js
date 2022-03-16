export const botAddsReaction = (app) => {
  app.action('actionId-0', async ({ body, client, ack, action, respond, message }) => {
    try {
      await ack();
      await respond({
        replace_original: true,
        user: action.user,
        text: 'fantastic :tada:'
      });
      app.client.reactions.add({
        name: 'white_check_mark',
        timestamp: body.message.ts,
        channel: body.channel.id,
        thread_ts: body.message.ts
      });
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};
