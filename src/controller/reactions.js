export const botAddsReaction = (app) => {
  app.event('reaction_added', async ({ event, client, message, say, body }) => {
    if (event.user === 'U035UDUM0H0') return;
    if (event.reaction === 'white_check_mark') {
      console.log('that worked');
      console.log(event);
    }
  });
};
