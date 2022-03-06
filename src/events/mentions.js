export const memberMentionsBot = (app) => {
  app.event('app_mention', async ({ context, event }) => {
    try {
      await app.client.chat.postEphemeral({
        token: context.botToken,
        channel: event.channel,
        user: event.user,
        text: `Hello <@${event.user}> :wave:\n\nLooking for a little help? Type '/ps_help_commands' and hit enter to see how I can help`,
      });
      // it worked lets do something else.
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  });
};
