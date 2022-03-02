export const appHomeOpen = (app) => {
  app.event('app_home_opened', ({ event, say }) => {
    say(`Hello! :wave: <@${event.user}>!`);
  });
};
