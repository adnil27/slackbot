export const actionController = (app) => {
  app.action('yes_button', async ({ ack, action, body, context, client, respond }) => {
    await ack();
    console.log(action);
    if (body.message) {
      const result = await app.client.conversations.history({
        channel: body.channel.id,
        latest: body.message.ts,
        inclusive: true,
        limit: 1
      });

      await respond({
        replace_original: true,
        user: body.message.user,
        text: 'hello :wave:'
      });

      const messageResult = result.messages[0];
      console.log(messageResult);

      const result1 = await client.reactions.add({
        name: 'white_check_mark',
        timestamp: messageResult.ts,
        channel: body.channel.id
      });
      console.log(result1);
    }
  });
};
