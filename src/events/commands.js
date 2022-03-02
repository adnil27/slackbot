export const nameThisFunction = () => {
  app.command("/psbotcommands", async ({ command, ack, say }) => {
    try {
      await ack();
      let message = { blocks: [] };
      psbotcommands.data.map((bot) => {
        message.blocks.push(
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: bot.header,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: bot.content,
            },
          },
          {
            "type": "divider"
          },
        );
      });
      say(message);
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });
}

export const nameThisFunction2 = () => {
  app.command("/add-ps-channel-guideline", async ({ command, ack, say }) => {
    try {
      await ack();
      const data = command.text.split("|");
      const newGuideline = {
        header: data[0],
        content: data[1],
      };
      // save data to db.json
      fs.readFile("psGuidelines.json", function (err, data) {
        const json = JSON.parse(data);
        json.data.push(newGuideline);
        fs.writeFile("psGuidelines.json", JSON.stringify(json), function (err) {
          if (err) throw err;
          console.log("Successfully saved to psGuidelines.json!");
        });
      });
      say(`:tada: You've added a new Guideline :tada: \n *Header* ${newGuideline.header} \n *Content* ${newGuideline.content}`);
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });
}