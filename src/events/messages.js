export const botRespondsToHelloMessage = (app) => {
  app.message(/hey|hi|hello/, ({ message, say, context }) => {
    if (message.channel === 'C034H2X55D4' && message.thread === message.thread_ts) {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          text: `Hello <@${message.user}> :wave:\n\nWhile you are waiting for the PS Team to get back to you, take a peek and see if you can find your answer in here.`
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
};

export const botRespondsToSalesforceMessage = (app) => {
  app.message(/treatwell.lightning.force.com/i, ({ message, say }) => {
    const hasIgluLink = /tools.treatwell.net\/iglu/i.test(message.text);
    if (!hasIgluLink) {
      say({ text: `Hey! <@${message.user}> :wave: Could you double check that you have included the Iglu link, pretty please with a :cherries: on top?`, thread_ts: message.ts });
    }
  });
};
