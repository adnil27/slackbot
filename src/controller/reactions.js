export const botAddsReaction = (app) => {
  app.action('actionId-00', async ({ body, client, ack, action, respond, message }) => {
    try {
      await ack();
      await respond({
        replace_original: true,
        user: action.user,
        text: 'fantastic :tada:'
      });
      app.client.reactions.add({
        name: 'white_check_mark',
        timestamp: 1647505473.725879,
        channel: body.channel.id
      });
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};
