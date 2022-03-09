export const botRespondsToHelloMessage = (app) => {
  app.message(/hey|hi|hello/, ({ message, say, context }) => {
    if (message.channel === 'C034H2X55D4' && message.thread === message.thread_ts) {
      try {
        app.client.chat.postEphemeral({
          token: context.botToken,
          channel: message.channel,
          user: message.user,
          blocks: [
            {
              type: 'actions',
              elements: [{
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'XXXX',
                  emoji: true
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true
                    },
                    value: 'value-0'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true
                    },
                    value: 'value-1'
                  }
                ], // some logic here for option values
                action_id: 'selectmenu'
              }]
            }
          ]
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
  app.action('selectmenu', async ({ body, ack, say, action }) => {
    // Acknowledge the action
    await ack();
    if (action.selected_option.value === 'value-0') {
      await say(`<@${body.user.id}> clicked value 0`);
      console.log(action);
    }
    if (action.selected_option.value === 'value-1') {
      await say(`<@${body.user.id}> clicked value 1`);
      console.log(action);
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
