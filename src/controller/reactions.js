export const botAddsReaction = (app) => {
  app.event('reaction_added', async ({ event, context, body, message }) => {
    if (event.user === 'U035UDUM0H0') return;
    if (event.reaction === 'white_check_mark' && event.item.channel === 'C034H2X55D4') {
      console.log(event);
      app.client.chat.postEphemeral({
        token: context.botToken,
        channel: event.item.channel,
        user: event.user,
        thread_ts: event.item.ts,
        text: `Fantastic News <@${event.user}>! :tada:\n\n We have marked your request as complete.`
      });
      app.client.reactions.add({
        name: 'robot_face',
        timestamp: event.item.ts,
        channel: event.item.channel
      });
      app.client.reactions.add({
        name: 'snowflake',
        timestamp: event.item.ts,
        channel: event.item.channel
      });
    }
  });
  app.event('reaction_removed', async ({ event, context, body, message }) => {
    if (event.user === 'U035UDUM0H0') return;
    if (event.reaction === 'white_check_mark' && event.item.channel === 'C034H2X55D4') {
      console.log(event);
      app.client.chat.postEphemeral({
        token: context.botToken,
        channel: event.item.channel,
        user: event.user,
        thread_ts: event.item.ts,
        text: `Hey <@${event.user}> We have reopened your query.`
      });
      app.client.reactions.remove({
        name: 'robot_face',
        timestamp: event.item.ts,
        channel: event.item.channel
      });
      app.client.reactions.remove({
        name: 'snowflake',
        timestamp: event.item.ts,
        channel: event.item.channel
      });
    }
  });
};
