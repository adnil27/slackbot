export const newMemberJoinedChannel = (app) => {
  app.event('member_joined_channel', async ({ context, event }) => {
    try {
      const reply = `Hey! <@${event.user}> :wave: Welcome to *#product-support* Type '/product-support' into a direct message to your *Slackbot* to see our channel guidelines.\n\n:pray: Please don't type '/product-support' in the *#product-support* channel. The message will be seen by *everyone* :flushed:`;
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `${reply}`,
        thread_ts: event.ts
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  });
};
