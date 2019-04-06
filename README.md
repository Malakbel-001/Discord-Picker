# Discord-Picker.

This is still a work in progress.

### Looking to implement :
- Availability Checker
- Google API
- Bonus: League API for other functionality

## Installation

Download or fork the source and put it in an approriate folder where you want to run the bot from

### Prerequisites

* [Node.js](https://nodejs.org/en/) - v8 or higher
* [node-gyp](https://github.com/nodejs/node-gyp#installation) - Needed to run better-sqlite3
* [Discord Bot & Token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) - Setup and get your own Discord bot (token)
* [Google API & Service Account JSON Private Key](http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/) - Setup and get your own Service Account with JSON key

```
npm install
```

### Create .env file in the main directory and put the following lines inside:

```
BOT_TOKEN=[DISCORD_BOT_TOKEN_HERE]
PREFIX=!
```

### Put the private-googleapikey.json in your main directory

To run your bot locally for testing purposes:

```
npm run dev
```

If you want to run the bot for your own server(s):

```
npm start
```

## Discord JS docs & guides for coding
- https://discord.js.org/#/docs/
- https://discordjs.guide/
- https://anidiots.guide/

### Recommended free hosting:
- Redhat Openshift
- Heroku
