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
              type: 'section',
              block_id: 'section_0',
              text: {
                type: 'mrkdwn',
                text: `Hey there <@${message.user}>! How can we help? Choose an option.`
              },
              accessory: {
                action_id: 'selectmenu',
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'select items'
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: 'item0'
                    },
                    value: 'value-0'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: 'item1'
                    },
                    value: 'value-1'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: 'item2'
                    },
                    value: 'value-2'
                  }
                ]
              }
            }
          ]
        });
      } catch (e) {
        console.log(`error responding ${e}`);
      }
    }
  });
  app.action('selectmenu', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
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
