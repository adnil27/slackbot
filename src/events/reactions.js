export const queryResolvedByUser = (app) => {
   app.event('reaction_added', async ({ context, event }) => {
      if (event.reaction == "white_check_mark" && event.item.channel == "C034H2X55D4"){
        try {
          const message = `:white_check_mark: Fantastic! Another query resolved by <@${event.user}>`;
          await app.client.chat.postMessage({
            token: context.botToken,
            channel: 'C034QGR0X6Z',
            text: message,
          });
        } catch (e) {
          console.log(`error responding ${e}`);
        }
      }
   })
}

export const queryReopenedByUser = (app) => {
  app.event("reaction_removed", async ({ context, event}) => {
    if (event.reaction == "white_check_mark" && event.item.channel == "C034H2X55D4"){
      try {
        await app.client.chat.postMessage({
          token: context.botToken,
          channel: 'C034QGR0X6Z',
          text: `:white_check_mark: Removed`,
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
}

export const queryNotEnoughInfoRemoved = (app) => {
  app.event("reaction_removed", async ({ context, event}) => {
    if (event.reaction == "warning" && event.item.channel == "C034H2X55D4"){
      try {
        await app.client.chat.postMessage({
          token: context.botToken,
          channel: 'C034QGR0X6Z',
          text: `:warning: Removed`,
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
}

export const queryNotEnoughInfo = (app) => {
  app.event("reaction_added", async ({ context, event}) => {
    if (event.reaction == "warning" && event.item.channel == "C034H2X55D4"){
      try {
        await app.client.chat.postMessage({
          token: context.botToken,
          channel: 'C034QGR0X6Z',
          text: `:warning: Oops looks like we are missing some information.`,
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
}