export const resolution = (app, message, context, reply, introduction, solution, extraInformation, isSolved) => {
  block: [
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: reply + `<@${message.user}>` + introduction
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: solution
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: extraInformation
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: isSolved
      }
    },
    {
      type: 'divider'
    }
  ]
};
