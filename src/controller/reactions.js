export const botAddsReaction = (app) => {
  app.event('reaction_added', async ({ event, context, body, message }) => {
    if (event.user === 'U035UDUM0H0') return;
    if (event.reaction === 'white_check_mark' && event.item.channel === 'C034H2X55D4') {
      console.log(event);
      app.client.reactions.add({
        name: 'robot_face',
        timestamp: event.item.ts,
        channel: event.item.channel
      });
    }
  });
  app.event('reaction_removed', async ({ event, context, body, message }) => {
    if (event.user === 'U035UDUM0H0') return;
    if (event.reaction === 'white_check_mark' && event.item.channel === 'C034H2X55D4') {
      console.log(event);
      app.client.reactions.remove({
        name: 'robot_face',
        timestamp: event.item.ts,
        channel: event.item.channel
      });
    }
  });
};
