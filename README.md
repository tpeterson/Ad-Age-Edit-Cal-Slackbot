# Ad-Age-Edit-Cal-Slackbot
A Slack bot to check Ad Age's editorial calendar.

Using the /editcal slash command, people can ask the bot questions like "When is the Media Issue," "What issue is on January 25" or "What is the next issue." And the bot will pull the name or date from Ad Age's editorial calendar and reply with the answer in Slack.

The bot is super basic/not that smart. For example, queries can't end in punctuation, months must be spelled out in full and dates must be numbers only. Also questions must be styled in certain ways:

- When is the next issue
- What is the next issue
- When is the [issue name] issue
- What issue is [month] [date]
- Which issue is [month] [date]
