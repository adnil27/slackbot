export const actionController = (app) => {
  app.action('yes_button', async ({ ack, action, body, client }) => {
    await ack();

    const messageID = action.ts;
    const channelID = body.channel.id;

    const result = await app.client.conversations.history({
      channel: channelID,
      latest: messageID,
      inclusive: true,
      limit: 1
    });

    const messageResult = result.messages[0];
    console.log(messageResult);

    await app.client.reactions.add({
      name: 'white_check_mark',
      timestamp: messageResult.ts,
      channel: body.channel.id
    });
  });
};
