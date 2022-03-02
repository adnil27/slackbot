export const memberMentionsBot = (app) => {
  app.event("app_mention", async ({ context, event }) => {
    try {
      const reply = `Hello <@${event.user}> :wave: Looking for a little help? Type '/help' into a direct message to your *Slackbot* to see how I can help you. :nerd_face:\n\n:pray: Please don't type '/help' in *#product-support*. The message will be visible to *everyone* :flushed:`;
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: reply,
        thread_ts: event.ts
      });
      // it worked lets do something else.
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  });
}