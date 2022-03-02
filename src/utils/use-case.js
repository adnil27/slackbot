export const useCaseLoader = (app, { type, action, trigger, reply, thread = true }) => {
  app.type(action, async ({ context, event }) => {
    try {
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
}