export const botAddsReaction = (app) => {
  app.event('reaction_added', async ({ event, context }) => {
    if (event.user === 'U035UDUM0H0') return;
    if (event.reaction === 'white_check_mark' && event.item.channel === 'C034H2X55D4') {
      console.log('that worked');
    }
  });
};
