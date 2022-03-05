export const botRespondsToHelloMessage = (app) => {
  app.message(/hey|hi|hello/, ({ message, say }) => {
    say({ text: `Hey! <@${message.user}> :wave: While you are waiting for one of the PS team to get back to you, why don't you try typing '/help' into a direct message to your *Slackbot* to see how I can help you. :nerd_face:\n\n:pray: Please don't type '/help' in *#product-support*. The message will be visible to *everyone* :flushed:`, thread_ts: message.ts });
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
